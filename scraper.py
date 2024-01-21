"""
Webscrape LinkedIn with BeautifulSoup4 for internship
job information.
Created: Saturday, January 20, 2024
@author: Mary Voorhees (mvoorhe)
"""

import requests
import time
from bs4 import BeautifulSoup
from array import *
from selenium import webdriver

# Formating for internship.txt: 
# "company||logo||salary||skill1|skill2||description||link||degree1|degree2||location1|location2"

SCROLL_PAUSE_TIME = 0.5

#while True:

class Internships():
    def findShip():
        driver = webdriver.Firefox()
        driver.get("https://www.linkedin.com/jobs/search?keywords=&location=United%20States&geoId=103644278&f_TPR=&f_E=1&position=1&pa")

        # overwrite file
        temp = open("internship.txt", "w")
        temp.write("")
        temp.close()

        # Scroll height
        last_height = driver.execute_script("return document.body.scrollHeight")

        # LinkedIn SearchJobs page is the base url (Beautiful Soup)
        search_page = requests.get("https://www.linkedin.com/jobs/search?keywords=&location=United%20States&geoId=103644278&f_TPR=&f_E=1&position=1&pa")
        src = search_page.content
        soup = BeautifulSoup(src, 'lxml')

        while (True):
            # Scroll down to bottom
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

            # Wait to load page
            #time.sleep(SCROLL_PAUSE_TIME)

            # find all <a/> tags (which contain page link)
            links = soup.find_all("a", class_="base-card__full-link absolute top-0 right-0 bottom-0 left-0 p-0 z-[2]")
            for link in links:
                ship_url = link.attrs['href']

                src = requests.get(ship_url).content
                soup = BeautifulSoup(src, 'lxml')
                
                # find company
                company_tag = soup.find("a", class_="topcard__org-name-link topcard__flavor--black-link")
                if company_tag is None:
                    company = "aekjfo;i"
                    #print("error1")
                else:
                    company = company_tag.text
                    company = company.strip()
                    #print(company)

                # find logo
                logo_tag = soup.find("a", target="_self")
                if logo_tag is None:
                    logo = "aekjfco;i"
                    #print("error2")
                else:
                    logo = logo_tag.find("img").attrs['data-ghost-url']
                    #print(logo)

                # find position
                position_tag = soup.find("h1", class_="top-card-layout__title font-sans text-lg papabear:text-xl font-bold leading-open text-color-text mb-0 topcard__title")
                if position_tag is None:
                    position = "aekjfo;i"
                    #print("error2.5")
                else:
                    position = position_tag.text
                    position = position.strip()
                    #print(position)
                
                # find salary
                salary_tag = soup.find("div", class_="salary compensation__salary")
                if salary_tag is None:
                    salary = "aekjfo;i"
                    #print("no salary")
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
                    #print(salary)
        
                # find description
                description_tag = soup.find("div", class_="core-section-container__content break-words")
                
                if description_tag is None:
                    description = "aekjfo;i"
                    #print("error3")
                else:
                    description_tag = description_tag.find("div")
                if description_tag is None:
                    description = "aekjfo;i"
                    #print("error3")
                else:
                    description_tag = description_tag.find("div")
                
                if description_tag is None:
                    description = "aekjfo;i"
                    #print("error3")
                else:
                    description = description_tag.text
                    description = description.strip()
                    description = description.replace("\n", "")
                    #print(description)
                
                # find link
                link_tag = soup.find("link", rel="canonical")
                if link_tag is None:
                    link = "aekjfo;i"
                    #print("error4")
                else:
                    link = link_tag.attrs['href']
                    print(link)
                
                # find location
                location_tag = soup.find("span", class_="topcard__flavor topcard__flavor--bullet")
                if location_tag is None:
                    location = "aekjfo;i"
                    #print("error5")
                else:
                    location = location_tag.text
                    location = location.strip()
                    #print(location)

                #print("\n")
                    
                file = open("internship.txt", "a")
                text = company + "||" + logo + "||" + position + "||" + str(salary) + "||" + description + "||" + link + "||" + location + "\n"
                text = text.encode('utf-7', errors='ignore').decode('utf-8')
                file.write(f"" + text)
                file.close()
            
    findShip()
