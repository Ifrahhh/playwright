const { test, expect } = require('@playwright/test');


    test('Scenario 1', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await page.waitForSelector('.row > #content > ul > li:nth-child(6) > a')
    await page.click('.row > #content > ul > li:nth-child(6) > a')
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    expect(page.url()).toBe("https://the-internet.herokuapp.com/checkboxes")
    // Unchecks the checkbox 2 //
    await page.waitForSelector('.row > #content > .example > #checkboxes > input:nth-child(1)')
    await page.click('.row > #content > .example > #checkboxes > input:nth-child(1)')
    // checks the checkbox 1 //
    await page.waitForSelector('.row > #content > .example > #checkboxes > input:nth-child(3)')
    await page.click('.row > #content > .example > #checkboxes > input:nth-child(3)')
    // Adding assertions - Checks if check 1 is checked or not // 
    const checked = await page.isChecked('input:nth-child(1)');
    expect(checked).toBeTruthy(); 
 })

  test('Scenario 2', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/');
    await page.waitForSelector('.row > #content > ul > li:nth-child(21) > a')
    await page.click('.row > #content > ul > li:nth-child(21) > a')
    
    await page.goto('https://the-internet.herokuapp.com/login');
    await expect(page.url()).toBe("https://the-internet.herokuapp.com/login")
    // enter username  //
  const username = await page.$('#username');
  await username.type('tomsmith', {delay : 10});
  // enter password //
   const password = await page.$('#password');
  await password.type('SuperSecretPassword!', {delay : 10});
  await page.click('.row > #content > .example > #login > .radius')
 

  await page.goto('https://the-internet.herokuapp.com/secure');
  await expect(page.url()).toBe("https://the-internet.herokuapp.com/secure")
  // Verifying login success msg //
  await expect(page.locator('#flash-messages'), 'You logged into a secure area!').toBeVisible();

  /*
  const visible = await page.isVisible('#flash-messages');
  expect(visible).toBeTruthy();
  /*
  const text = await page.innerText('#flash');
  expect(text).toBe('You logged into a secure area!');
  //await page.waitForSelector("#login-message", { visible: true });
*/
 // Click logout button //
 await page.click('.row > #content > .example > .button > .icon-2x')
 await page.goto('https://the-internet.herokuapp.com/login');
 await expect(page.url()).toBe("https://the-internet.herokuapp.com/login")
  // Verifying logout msg //
 await expect(page.locator('#flash-messages'), 'You logged out of the secure area!').toBeVisible();
 //await expect(page.locator('#flash-messages')).toHaveText('You logged out of the secure area!');

  })

  test('Scenario 3', async ({ page }) => {
    const navigationPromise = page.waitForNavigation()
    await page.goto('https://the-internet.herokuapp.com/');
    await page.waitForSelector('.row > #content > ul > li:nth-child(22) > a')
    await page.click('.row > #content > ul > li:nth-child(22) > a')
    await navigationPromise

    await page.goto('https://the-internet.herokuapp.com/iframe');
    expect(page.url()).toBe("https://the-internet.herokuapp.com/iframe");
    const text = await page.$('#mce_0');
    await text.type('Hello World');
    const content = await page.textContent('#mce_0');
    expect(content).toBe('Your content goes here.');    
/*
    const inputValue = await page.$('#tinymce', el => el.value);
    for (let i = 0; i < inputValue.length; i++) {
      await page.keyboard.press('Backspace');
    }
   await page.evaluate( () => document.getElementById("#tinymce").value = "")
*/
  })


