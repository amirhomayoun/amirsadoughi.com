+++
title = "My first post using Hugo, Github, and Netlify"
date = 2018-02-13T00:05:11-05:00
draft = false
tags = ["Hugo", "Netlify", "git", "Github"]
categories = ["Web Development", "Automation"]
description = "A programmer's approach to creating websites"
+++



Fixing my old website and perhaps writing more frequently had been on my to-do list for a while now. A friend of mine, [Danny Guo](https://www.dannyguo.com/), told me about [Netlify](https://netlify.com) a few weeks ago and I started reading about it and then about [Hugo](https://gohugo.io) and got hooked. And here we are, my first post, written in markdown, powered by Hugo, and deployed by Netlify. 

I can keep my source under git and can easily publish a post by a pushing to Github, and if that excites you too, we have enough in common to hold a conversation or two! The steps needed for creating a website like mine:

* Create a Github (or Gitlab) account.
* Create a Netlify account and connect it to your Github (or Gitlab) account.
* Read through the [getting started](https://gohugo.io/getting-started/) guide of Hugo.
* Choose a theme from the [huge list of themes](https://themes.gohugo.io/) Hugo provides.
* Make your website work locally.
* Push your website and watch as Netlify builds and publishes your website.
* Change your domain's DNS to Netlify's and set up TLS.


Deploying via Netlify was the easiest part of it. Creating TLS certificates using [Let's encrypt](https://letsencrypt.org) (donate to them if you can!) was literally as easy as pressing a button and my website was up in a matter of minutes after I had something basic working locally. Hugo is also designed very logically and once you get used to its directory structure, you can make progress quickly. I suggest you find a theme you like and build on top of it. I am using the [blackburn](https://github.com/yoshiharuyamashita/blackburn) theme and you can find the source code of my website in [my Github](https://github.com/amirhomayoun/amirsadoughi.com).
 

Seeing how easy it is to create new posts, I am hopeful that I will write more, probably about the topics found in [about me]({{< ref "about.md" >}}).

