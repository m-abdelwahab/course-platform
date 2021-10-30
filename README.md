# Course Platform

<img width="1440" alt="CleanShot 2021-10-26 at 17 32 13@2x" src="https://user-images.githubusercontent.com/27310414/138912033-e067008a-441c-4696-8e08-175f19809208.png">


> 👉 I go over the details of why and how I built this demo during my talk, presented at Next.js conf 2021.


> ⚠️ This repo + README are a work in progress. I plan to maintain this example and add more features over time. If you see any room for improvement, feel free to submit a PR 😄


Live demo: https://epic-course-platform.vercel.app/

## Tech Stack

Course Platform template built using the following tools:
- Next.js (fullstack React framework)
- next-mdx-remote (Add support for MDX when using Next.js)
- next-auth (authentication for Next.js apps)
- Prisma (Next-gen ORM for Node.js & TypeScript)
- PlanetScale (Serverless MySQL Database)
- TailwindCSS (Styling)
- Vercel (Deployment)
- SendGrid (Sending emails)
- TypeScript

## Why this stack

This stack is awesome for the following reasons:
- Make fewer errors when using TypeScript and you also get zer-cost type-safe database access when using Prisma
- All tools offer fantastic developer experience
- All of the tools have great developer communities
- All of these tools allow you to easily scale (Vercel + PlanetScale)

## Setting up the project 

To set up the project locally, run the following commands:

```bash
git clone https://github.com/m-abdelwahab/course-platform.git

cd course-platform

npm install

npm run dev
```

This will install the project and start a local development server at [`localhost:3000`](http://localhost:3000).

> ⚠️ Make sure you've nodejs version ^12.19.0 or ^14.15.0 or ^16.13.0", cause those are the only versions supported by next-auth@beta otherwise you'll get ```"next-auth/react" module not found``` error when you run the app

> ❗️ Make sure your rename the `.env.example` to `.env`
### Setting up the database

To set up a database on PlanetScale, check out this detailed [guide](https://docs.planetscale.com/tutorials/automatic-prisma-migrations), which goes over how to work with PlanetScale and Prisma.

### Setting up an email sending service

I'm using SendGrid. Hee's what you need to do to get started:

First, create an account and setup a sender email for testing your integration.

<img width="1910" alt="creae account on sendgrid" src="https://user-images.githubusercontent.com/27310414/138910799-2a3cdb64-2bd2-4e5e-af89-03fdf84f6a00.png">


After that, go to the Integration Guide in the Email API dropdown on the left sidebar. Next, pick SMTP relay

<img width="1919" alt="Picking SMTP as the integration" src="https://user-images.githubusercontent.com/27310414/138910933-24a6c92b-4b13-4400-ac12-51c6d5bf944f.png">


Finally, create an API key and add the following variables to your `.env` file
 

```bash
EMAIL_SERVER_USER= 'apikey'
EMAIL_SERVER_PASSWORD= 'YOUR_PASSWORD'
EMAIL_SERVER_HOST= 'smtp.sendgrid.net'
EMAIL_SERVER_PORT= '587'
EMAIL_FROM = 'your-sender-email@example.com'
```

<img width="1919" alt="CleanShot 2021-10-26 at 12 07 05@2x" src="https://user-images.githubusercontent.com/27310414/138911045-9a47bc1a-2bbd-42a6-8254-28a3ba01f96b.png">


### Setting up Stripe Checkout

Creating an account at stripe.com and login into your dashboard. Next, go to the products tab and add a product

![Add product](https://user-images.githubusercontent.com/27310414/138911182-2648f9b6-7e10-479f-836c-cb5376b129c9.png)


After that, go to the product details page by clicking on the product from the product list and grab the `API ID` from the pricing section and include it in the `/api/checkout` file

![pick PriceId from product settings](https://user-images.githubusercontent.com/27310414/138911339-2c10bcc4-240a-42e0-a329-3bd4e0f2daaa.png)



Finally, to add support for webhooks, go to the "Developers tab" and click "add endpoint".

![Webhooks](https://user-images.githubusercontent.com/27310414/138911455-e31805e0-e0ab-4a49-aefd-1be8e97f55f8.png)

You can test in a local environment using Stripe's CLI by forwarding events to your webhooks and triggering a `charge.succeeded` event.

<img width="1920" alt="Setting up a webhook endpoint" src="https://user-images.githubusercontent.com/27310414/138911561-7f2c63b8-f78b-4be0-a978-c2fbf7b28957.png">


```
stripe listen --forward-to localhost:3000/api/webhook

stripe trigger charge.succeeded

```

If you followed all the previous steps correctly, you should see a newly added user in your database, while listening to the `charge.succeeded` event.


For production, you need to set the endpoint URL to `domain-of-your-deployment/api/webhook` and select the `charge.succeeded` event. Finally, you need to grab the signing secret, which will be set to the `STRIPE_WEBHOOK_SECRET` when deploying to Vercel.

![Webhook secret](https://user-images.githubusercontent.com/27310414/138911739-8e2387e1-5a94-4407-8e02-30621f2c4881.png)



## Credits

- [Landing page illustration](https://www.pixeltrue.com/free-packs/popular-icons) 
