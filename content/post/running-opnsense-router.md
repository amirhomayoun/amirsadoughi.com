+++
title = "Running an OPNSense router"
date = 2022-11-30T22:50:02-05:00
draft = false
tags = ['router', 'opnsense', 'network']
categories = ['Security','Home Server']
description = ""
+++

## Background

For the past 9 years or so, I have been running [Asuswrt-Merlin](https://www.asuswrt-merlin.net/) on my ASUS RT-AC68U and later RT-AC86U (AC1900, and AC2900 respectively). I have been very happy with both routers and with Merlin, and they gave me whatever I needed in terms of security and features. All my devices had static IPs on the network. I could easily set up my own VPN client so the whole network would go through a third-party VPN, and I could run a VPN server so that I could connect to my home network when away on my phone. I could forward the necessary ports so that I could expose the services I wanted to to the world wide web, and I managed to have a Pi-hole power DNS queries.

The itch to run a more substantial software for router started when I decided to do more home assistant stuff, and decided I needed VLANs. Also exposing services is scary, and I'd want to set up penetration tests. To do all of this (and more), I decided to get a mini pc and install OPNSense on it.

## OPNSense or pfsense

You can read about the history of OPNSense on [their about page](https://opnsense.org/about/about-opnsense/), but the gist of it is that a project called m0n0wall was forked in 2004 and became pfsense, later in 2014, pfsense was forked and OPNSense was created. The [fork](https://docs.opnsense.org/history/thefork.html) page explains it, but at least for me, having a company (netgate) own the code (even though it is open source) means that I have to deal with things I don't want to deal with. One example is the releases, you can get *pfSense plus* or *pfSense CE*. I guess you have to pay for the plus one, and CE is the community edition, reminds me of Redhat and Fedora, but again, not something I want to deal with. The community is probably bigger around pfSense, as it has been out there longer, but most solutions you find for networking can be applied to OPNSense easily, so, it hasen't been an issue so far. Netgate (the company behind pfSense) is an American company, and my impression is that OPNSense is being developed mostly in Europe (Or at least it has more users there).

## Migration

<img style="float:right" width="150" heigh="auto" src="/images/tmobile_router.png">

To do a migration like this, it helps if you could set up a parallel system as the one you have and after getting comfortable with the new one migrate every client. To do that, I decided to use a T-Mobile 5g home internet. For about $50 a month, you can get a decent internet connection (if you are lucky enough and live in an area they cover well). I had speeds of up to 60-70 Mbps for download, and 20-30 Mbps for upload. Pretty good for what I need on a daily basis. The only issue with it is that you don't get a dedicated external IP address, as T-Mobile, like all other cell phone carriers, is using [CGNAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT). Basically, the modem they give you gets a *private IP address* and some translation happens on T-Mobile side from your (dynamic) external IP address to the private one the router has. This is not ideal, for anyone who wants to expose self hosted services as you need to somehow connect your domain name to your (hopefully relatively stable if not static) external IP address. And of course, with CGNAT you cannot get to your services, as the NAT layer, even if you hit the temporary external IP address, will not allow port forwarding. So, all in all, the 5g internet was good enough for the transition period, where I hooked it up to my Asus router, and used it for daily things, as I was working on my new OPNSense set up. But I doubt I will keep it. Ideally, I want to have a backup internet connection and run my router in dual WAN mode, so that if my main connection goes down, all my services are still working uninterrupted, but for that I'd need a dedicated IP address which unfortunately T-Mobile does not provide [at least yet](https://community.t-mobile.com/tv-home-internet-7/nat-forwarding-in-t-mobile-gateway-39917).

## Hardware

### Router

<img style="float:right" width="150" heigh="auto" src="/images/qotom_router.png">

I wanted a fan-less mini pc, and didn't want to spend too much either. I figured I'd need 8 GB of memory, and a 2 core decent CPU would be overkill. Qotom is a brand that makes a lot of mini pcs like this, and I ended up buying one for a few hundred dollars (including memory and ssd). You can go with something simpler as well (Not something ARM Based as OPNSEense works on BSD), but if you want to run VPN server/clients, penetration tests, netflow, DNS resolvers, and other services, it's probably wise to investing in something mid-range at least. Using these services, I see my memory usage is at %25, and I hardly see any CPU spikes.

### Switch

<img style="float:right" width="150" heigh="auto" src="/images/switch.png">

As I have a small setup, I decided to go with an 8 port layer 3 switch. This will help with managing VLANs, and can also power the access point using PoE.


### Access point

<img style="float:right" width="150" heigh="auto" src="/images/ap.png">
I went with a TP-Link access point. It can be powered using PoE, and it knows about VLANs, meaning I can create separate WI-FI networks for different categories. So, controlling what device connects to which interface (on the router side) comes down to what SSID it connects to. The access point tags packets with the correct VLAN, and the switch sends them through, and the router applies the correct firewall rules to the traffic. 


## Installation and Initial setup

I followed [the official installation documents](https://docs.opnsense.org/manual/install.html), and it went very smoothly. I had my system up and running within minutes. For a few weeks, I had my laptop connected via one of the ports as it is the easiest way to set things up. After I got comfortable with OPNSense, added the switch to the mix, and after a while added the access point. Playing with firewall rules, setting up all the interfaces, defining VLANs, setting the VLANs on the switch, and creating the proper WI-FI SSIDs for each will take a while. At this point I could migrate some of my devices to the new set up. Working on this after work, and an hour or two a day, I think after 2 weeks I got to this point.
