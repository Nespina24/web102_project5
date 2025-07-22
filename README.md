# Web Development Project 5 - *Recipe Finder*

Submitted by: **Nathan Espina**

This web app: **Shows different recipes, which can be filtered through ingredients or cuisine**

Time spent: **8** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - *insert details here*
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [x] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] Displayed an image of what the recipe should look like

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![Website Walkthrough](https://github.com/Nespina24/web102_project5/blob/main/RecipeWalkthrough2.gif)


GIF created with ...  

[ScreenToGif](https://www.screentogif.com/) for Windows

## Notes

My biggest challenge was trying to work my way around the API limit. While I was first debugging, I made it so that it would only make API calls after a button was pressed in order to limit the amount of calls. When the jsx and css finally looked complete, I switched it to useEffect, which ate up significantly more calls than using a button. After recording the gif which showcased useEffect, which took around 25 API points, I ended with 125 points out of the total 150 allowed points.

## License

    Copyright 2025 Nathan Espina

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
