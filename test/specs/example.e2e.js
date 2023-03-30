describe('Open page and check', () => {
    it('the page Buttons', async () => {
        //Open browser, go to url, check the title  
        await browser.url(`https://eviltester.github.io/synchole/buttons.html`);
        const title = await browser.getTitle();
        await expect(title).toEqual("Buttons");
        //find Start button by ID and click it
        const startButton = await $('#easy00');
        await startButton.click();
        //button that appeared after click
        const afterClickButton = await $('#easy01');
        const isDisplayed = await afterClickButton.waitForDisplayed({ timeout: 5000 });
        await expect(isDisplayed).toEqual(true);
        //find second Start button by ID and click it
        const secondStartButton = await $('#button00');
        await secondStartButton.click();
        // check the button01 become enabled adn click it
        const button01 = await $('#button01');
        const buttton01IsEnabled = await button01.waitForEnabled({ timeout: 3000 });
        await expect(buttton01IsEnabled).toEqual(true);
        await button01.click();
        //check that another button has become enabled(use explicit waiter)
        const button02 = await $('#button02');
        const button02IsEnabled = await button02.waitForEnabled({ timeout: 5000 });
        await expect(button02IsEnabled).toEqual(true);
    });

    it('the Message Simulator', async () => {
        //Open browser, go to url 
        await browser.url(`https://eviltester.github.io/synchole/buttons.html`);
        //Select message simulator, click on it, check the url
        const messageSimulator = await $('=Message Simulator');
        await messageSimulator.click();
        await expect(browser).toHaveUrl('https://eviltester.github.io/synchole/messages.html')
        // find "hello there" by xPath implicitly, and check it is displayed 
        const helloText = await browser.waitUntil(async () => {
            return await $("//li[text()='hello there']")
        }, {
            timeout: 8000,
            interval: 500,
            timeoutMsg: 'expected text "hello there" is not appear after 8s'
        });

        await expect(helloText).toBeDisplayed();
    });

    it('the Simple Form', async () => {
        //Open browser, go to url 
        await browser.url(`https://eviltester.github.io/synchole/buttons.html`);
        //open simple form and check it opened
        const simpleForm = await $('//a[normalize-space()="Simple Form"]')
        await simpleForm.click();
        await expect(browser).toHaveUrlContaining('form.html');
        // set value username
        const input = await $('//input[@name="username"]');
        await input.setValue('Oleksandr');
        //click submit button
        const submit = await $('//input[@type="submit"]');
        await submit.click();
        //check user name appeared
        const usernaeme = await browser.waitUntil(async () => {
            return await $('//li[@data-value="Oleksandr"]');
        });
        await expect(usernaeme).toBeDisplayed();
    })
});