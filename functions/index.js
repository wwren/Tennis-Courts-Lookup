const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const cors = require("cors")({ origin: true });

const facilities = [
  {
    idx: "0",
    name: "Marrickville Lawn",
  },
  {
    idx: "1",
    name: "Surry Hills",
  },
  {
    idx: "2",
    name: "Alexandria",
  },
  {
    idx: "4",
    name: "Glebe",
  },
];
const findAvailableSlotperFacility = async (facility, url, browser) => {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  return await page.evaluate(
    (facility, url) => {
      let tdBlanks;

      if (parseInt(facility.idx) > 0) {
        // City community tennis court
        let tdBooks = Array.from(document.querySelectorAll("td.book"));
        tdBlanks = tdBooks.filter((ele) => ele.childElementCount == 1);
      } else {
        // Marrickville tennis court
        tdBlanks = Array.from(
          document.querySelectorAll("a.book-interval.not-booked")
        );
      }

      if (tdBlanks.length == 0) {
        return {
          key: facility.idx,
          facilityLink: url,
          facilityName: facility.name,
          availableSlot: [],
        };
      }

      let timeArray =
        parseInt(facility.idx) > 0
          ? [...tdBlanks.map((ele) => ele.children[0].innerText.split(" ")[2])]
          : [...tdBlanks.map((ele) => ele.children[2].innerText.split(" ")[1])];

      let availableSlot = [...new Set(timeArray)].sort((a, b) => a - b);

      return {
        key: facility.idx,
        facilityLink: url,
        facilityName: facility.name,
        availableSlot: availableSlot,
      };
    },
    facility,
    url
  );
};

const findAvailableSlot = async (request) => {
  let availableSlots = [];

  for (var facility of facilities) {
    const url =
      parseInt(facility.idx) > 0
        ? `https://jensenstennis.intrac.com.au/tennis/book.cfm?facility=${facility.idx}&date=${request.query.date}`
        : `https://play.tennis.com.au/MarrickvilleDistrictLawnTennisClub/court-hire/book-by-date#?date=${request.query.date}`;

    if (!url) {
      return `Invalid url: ${url}`;
    }

    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
    });

    const availableSlotperFacility = await findAvailableSlotperFacility(
      facility,
      url,
      browser
    );

    availableSlots.push(availableSlotperFacility);
    browser.close();
  }

  return availableSlots;
};

exports.scraper = functions
  .runWith({
    timeoutSeconds: 120,
    memory: "2GB",
  })
  .https.onRequest((request, response) => {
    cors(request, response, async () => {
      let availableSlots = await findAvailableSlot(request);
      return response.send(availableSlots);
    });
  });
