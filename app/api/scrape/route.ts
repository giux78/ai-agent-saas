
import puppeteer from 'puppeteer';
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from '@/lib/auth';





export async function POST(req: Request) {
  const json = await req.json()
  
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }
  //Github
  //const userId = user.id
  const userId = user.email
  console.log("USER");
  console.log(user);
  
  console.log("USERID");
  console.log(userId);

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }


  
    const { urlToScrape } = json

    //const browser = await puppeteer.launch();
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
    })

    const page = await browser.newPage();
    await page.goto(urlToScrape);
    // Get the page source
    const pageSource = await page.evaluate(() => document.documentElement.outerHTML);

    // Use regex to match all .jpg URLs
    const regex = /https?:\/\/[^"]+\.jpg/g;
    const allJpgUrls = Array.from(pageSource.matchAll(regex), m => m[0]);

    const imageUrls = await page.$$eval('img', (images) =>
      images.map((img) => img.src)
    );
  
    console.log(imageUrls);
 
    const productImageUrls  = imageUrls.filter(url => url.includes('products'));
    //const productImageUrlsRedized = productImageUrls.map(url => url.replace(/\d{3}x\d{3}/g, '512x512'))
    // Get the meta image URL
    // const metaImageUrl = await page.$eval('meta[property="og:image"]', el => el.getAttribute('content'));

    // Check if metaImageUrl is not null, then add it to the productImageUrls array
    // if (metaImageUrl) {
    //   productImageUrls.push(metaImageUrl);
    // }
    // If productImageUrls is still empty, add all .jpg URLs
    if (productImageUrls.length === 0) {
      productImageUrls.push(...allJpgUrls);
    }

    console.log(productImageUrls)
    const textContent = await page.evaluate(() => {

      var r = document.getElementsByTagName('script');

      for (var i = (r.length-1); i >= 0; i--) {
          r[i].parentNode?.removeChild(r[i]);
      }

      var st = document.getElementsByTagName('style');

      for (var i = (st.length-1); i >= 0; i--) {
          st[i].parentNode?.removeChild(st[i]);
      }

      var noscript = document.getElementsByTagName('noscript');

      for (var i = (noscript.length-1); i >= 0; i--) {
        noscript[i].parentNode?.removeChild(noscript[i]);
      }

      const elements = document.querySelectorAll('div');
      const texts = [];
  
      for (let element of elements) {
        if (element.textContent && 
            element.textContent.trim().length > 0
            ) {
            const replaced = element.textContent.replace(/\s+/g, ' ')  
            texts.push(replaced.trim().replace(/(\r\n|\n|\r|\t)/gm, ""));
            //texts.push(element.tagName)
        }
      }
  
      return texts;
    });    

    await browser.close();
    console.log(textContent.length);
    console.log(textContent.join(' '));


    // https://beccacole.com/collections/tanks-shirts/products/copy-of-lagom-bikers?variant=41086005018802
    // https://www.cotopaxi.com/products/teca-fleece-hooded-full-zip-jacket-mens?variant=40158733926461
    console.log("NIIIIIII");
    console.log(productImageUrls);
    //const labelJson = await labeling(productImageUrls[0])
    //console.log(labelJson)
    //const label = labelJson[0].label.split(',')[0]
    let name = urlToScrape.split("/").pop();
    name = name?.split('?')[0]
    name = name?.split('.')[0]
    //.slice(0,10)
    return res.json({ "productImageUrls" : productImageUrls.slice(0,10),
                       "text" :  textContent.join(' '), 
                       "label" : "",
                       "name" : name,
                       "url" : urlToScrape
                      });


};

