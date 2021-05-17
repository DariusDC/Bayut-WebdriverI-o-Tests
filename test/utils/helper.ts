export const getElementFromListByTitle = async (
  list: WebdriverIO.ElementArray,
  title: string
): Promise<WebdriverIO.Element | null> => {
  //   let result = undefined;
  for (const element of list) {
    if ((await element.getText()) === title) return element;
  }
  return null;
};

export const validateLink = async (link: string): Promise<void> => {
  await browser.url(link);
  await expect(browser).toHaveUrl(link);
};
