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
# Formating for internship.txt: 
# "company||logo||salary||skill1|skill2||description||link||degree1|degree2||location1|location2"

class Internships():
    def findShip():
        # overwrite file
        temp = open("internship.txt", "w")
        temp.write("")
        temp.close()


        # LinkedIn SearchJobs page is the base url
        search_page = requests.get("https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0")
        src = search_page.content
        soup = BeautifulSoup(src, 'lxml')

        # find all <a/> tags (which contain page link)
        links = soup.find_all("a", class_="base-card__full-link absolute top-0 right-0 bottom-0 left-0 p-0 z-[2]")
        for link in links:
            ship_url = link.attrs['href']
            allShips.append(ship_url)

        for ship_page in allShips:
            #print(ship_page)
            src = requests.get(ship_page).content
            soup = BeautifulSoup(src, 'lxml')
            
            # find company
            company_tag = soup.find("a", class_="topcard__org-name-link topcard__flavor--black-link")
            if company_tag is None:
                company = "aekjfo;i"
                print("error1")
            else:
                company = company_tag.text
                company = company.strip()
                print(company)

            # find logo
            logo_tag = soup.find("img", class_="artdeco-entity-image artdeco-entity-image--square-5 lazy-loaded")
            if logo_tag is None:
                logo = "aekjfo;i"
                print("error2")
            else:
                logo = logo_tag['src']
                print(logo)
            
            # find salary
            salary_tag = soup.find("div", class_="salary compensation__salary")
            if salary_tag is None:
                salary = "aekjfo;i"
                print("no salary")
            else:
                salary = salary_tag.text
                salary = salary.strip()

                base_salary = salary.find('/')
                if salary[base_salary + 1:base_salary + 3] == "yr":
                    multiplier = 1
                elif salary[base_salary + 1:base_salary + 3] == "mo":
                    multiplier = 12
                elif salary[base_salary + 1:base_salary + 3] == "wk":
                    multiplier = 52
                elif salary[base_salary + 1:base_salary + 3] == "hr":
                    multiplier = 8760

                salary = salary[1:base_salary]
                salary = salary.replace(",", "")
                salary = float(salary) * multiplier
                print(salary)
    
            # find description
            description_tag = soup.find("div", class_="show-more-less-htmls")
            if description_tag is None:
                description = "aekjfo;i"
                print("error3")
            else:
                description = description_tag.text
                print(description)
            
            # find link
            link_tag = soup.find("button", class_="temp")
            if link_tag is None:
                link = "aekjfo;i"
                print("error4")
            else:
                link = link_tag.text
                print(link)
            
            # find location
            location_tag = soup.find("span", class_="topcard__flavor topcard__flavor--bullet")
            if location_tag is None:
                location = "aekjfo;i"
                print("error5")
            else:
                location = location_tag.text
                location = location.strip()
                print(location)

            print("\n")
            file = open("internship.txt", "a")
            file.write(f"" + company + "||" + logo + "||" + str(salary) + "||" + description + "||" 
                      + link + "||" + location + "\n")
            file.close()

        #print("test")
            
    print(findShip())
