import Page from "./page";

class Home extends Page {
  get searchInput(): WebdriverIO.Element {
    return $('header ul[aria-label="Location input"] input');
  }

  get forSaleSelectbutton(): WebdriverIO.Element {
    return $('header button[aria-label="For sale"]');
  }

  get findButton(): WebdriverIO.Element {
    return $('header a[aria-label="Find button"]');
  }

  get searchResults(): WebdriverIO.ElementArray {
    return $$('header ul[role="listbox"] li span[dir="auto"]');
  }

  get locationResults(): WebdriverIO.ElementArray {
    return $$('main ul._357a9937 li[role="article"]');
  }

  get popularSection(): WebdriverIO.Element {
    return $('main div[aria-label="Popular properties"]');
  }

  get popularSaleRentSection(): WebdriverIO.ElementArray {
    return $$("div._8211eb25 div");
  }

  async getDubaiAparments(): Promise<WebdriverIO.ElementArray> {
    const container = await $(
      'div._5a12e6f6._9b01d0a7 a[title="Apartments for sale in Dubai"]'
    );
    const div = await container.parentElement();
    const biggerDiv = await div.parentElement();
    return biggerDiv.$$("ul li a");
  }

  open() {
    return super.open("/");
  }
}

export default new Home();
