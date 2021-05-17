import Home from "../pageobjects/home.page";
import { getElementFromListByTitle } from "../utils/helper";

describe("Verify results match the search criteria", () => {
  before(() => {
    Home.open();
  });

  it("Select properties For Sale", async () => {
    await (await Home.forSaleSelectbutton).click();

    await expect(await Home.forSaleSelectbutton).toHaveAttrContaining(
      // It means that the button got clicked
      "class",
      "b77a79f5"
    );
  });

  it("should search for properties", async () => {
    await (await Home.searchInput).click();
    await (await Home.searchInput).setValue("Dubai Marina");
    await (
      await Home.searchInput
    ).waitUntil(
      async () => (await (await Home.searchInput).getValue()) === "Dubai Marina"
    );

    const results = await Home.searchResults;
    const result = await getElementFromListByTitle(results, "Dubai Marina");

    await result?.waitForClickable();
    await result?.click();

    await (await Home.findButton).click();
    await expect(await browser).toHaveUrl(
      "https://www.bayut.com/for-sale/property/dubai/dubai-marina/"
    );
  });

  it("should verify that displayed location contain the selected location", async () => {
    const articles = await Home.locationResults;
    await (await articles[0]).waitForDisplayed();
    const displayedLocations: string[] = await Promise.all(
      articles.map(async (article) => {
        const text: string = await (
          await article.$('div[aria-label="Location"]')
        ).getText();
        return text;
      })
    );

    displayedLocations.forEach(async (location) => {
      await expect(location).toHaveTextContaining("Dubai Marina");
    });
  });
});
