import Home from "../pageobjects/home.page";
import { getElementFromListByTitle, validateLink } from "./../utils/helper";

describe("Verify Popular Searches links work correctly", () => {
  before(() => {
    Home.open();
  });

  it("Scroll down to the 'Popular searches' section on the homepage", async () => {
    await (await Home.popularSection).scrollIntoView();
    await (await Home.popularSection).waitForDisplayed();

    await expect(await Home.popularSection).toBeDisplayed();
  });

  it("Open the 'To rent' tab", async () => {
    const forSaleBtn = await getElementFromListByTitle(
      await Home.popularSaleRentSection,
      "To Rent"
    );

    await forSaleBtn?.click();
    await expect(await forSaleBtn).toHaveAttrContaining("class", "_5e65009f");
  });

  it("Validate links under 'Dubai apartments' are functioning correctly", async () => {
    const list = await Home.getDubaiAparments();
    const links: string[] = await Promise.all(
      list.map(async (ap) => await ap.getAttribute("href"))
    );

    links.forEach(async (link) => {
      await validateLink(link);
    });
  });
});
