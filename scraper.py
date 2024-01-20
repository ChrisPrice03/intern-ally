"""
Webscrape LinkedIn with BeautifulSoup4 for internship
job information.
Created: Saturday, January 20, 2024
@author: Mary Voorhees (mvoorhe)
"""

import requests
from bs4 import BeautifulSoup
from array import *

allShips = [] # all internships on LinkedIn page
shipInfo = [][1] # contains intership information (String)

# ^^ Formating: "company||logo||salary||skill1|skill2||description||link||degree1|degree2||location1|location2"

class Internships():
    def findShip():

        # LinkedIn SearchJobs page is the base url
        search_page = requests.get("https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0")
        src = search_page.content
        soup = BeautifulSoup(src, 'lxml')

        # find all <li/> tags (which contain job information)
        links = soup.find_all("a", class_="base-card__full-link absolute top-0 right-0 bottom-0 left-0 p-0 z-[2]")
        for link in links:
            ship_url = link.attrs['href']
            allShips.append(ship_url)

        print(allShips)

    def findShipInfo():
        for ship_page in allShips:
            print("temp")
        print("test")

    
    print(findShip())
