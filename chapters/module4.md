---
title: 'Module 4: Intro to AMGeO'
description:
  'In this module, you will get an intro to AMGeO and 
  learn how to use AMGeOs API in Jupyter Notebook'
prev: /module3 
next: null
type: chapter
id: 4
---

<exercise id="1" title="Creating an AMGeO API object">

AMGeO now provides a new api object for interacting with AMGeO in a pythonic and 
notebook-friendly manner

To create a new `AMGeOApi` class, you will need to create a new instance of it

  <codeblock id="04_01">
    Create a new instance of the `AMGeOApi` class!
  </codeblock>

</exercise>

<exercise id="2" title="Setting an output directory">

  When running AMGeO, a local file system directory will be selected to store your assimilative maps. By default, AMGeo will use ```~/amgeo_v2_ouptput```

  ```python
  api.get_output_dir()
  ```

  But, if you want to specify another directory, you can set this in the API instance using ```set_output_dir```. This can be either a relative or absolute path.

  ```python
  api.set_output_dir('~/my/abs/path')
  api.set_output_dir('./relative/path')
  ```

</exercise>

<exercise id="3" title="Creating an AMGeO Controller">

  To generate assimilative maps, you will have to load specific settings from AMGeO. Conveniently, AMGeO's new API allows for a simple way to load AMGeO's default settings using a ```controller```.

  To create a ```controller``` instance, you can call ```get_controller``` on an API instance

  <codeblock id="04_02">
    Call the `AMGeOApi` method `get_controller` to get a new controller instance.
  </codeblock>

</exercise>

<exercise id="4" title="Generating Assimilative Maps">

  Now that we have a ```controller``` instance, we can create assimilative maps by calling the ```generate``` method on our ```controller```. This method takes both a hemisphere and a date argument. For example, if we wanted to generate maps for dates:

  - January 6th, 2013 16:30:00
  - January 6th, 2013 17:30:00
  - February 6th, 2013 12:30:00
  - February 6th, 2013 13:30:00

  and on the Northern hemisphere, we can call ```generate``` with ...

  ```python
  # datetime module is used for passing dates/datetimes
  from datetime import datetime, date

  dts = [
      datetime(2013, 1, 6, 16, 30, 0), # January 6th, 2013 16:30:00
      datetime(2013, 1, 6, 17, 30, 0), # January 6th, 2013 17:30:00
      datetime(2013, 2, 6, 12, 30, 0), # February 6th, 2013 12:30:00
      datetime(2013, 2, 6, 13, 30, 0) # February 6th, 2013 13:30:00
  ]
  # hemisphere
  h = 'N'

  # generate maps for a given hemisphere
  controller.generate(dts, h)
  ```

  Once complete, we will be able to see generated AMGeO maps for each datetime.

  ```controller.generate``` supports multiple different ways of generating maps based on dates/datetimes

  - A single datetime

      Will generate data for a specific date and time 
      ```python
      controller.generate(datetime(YYYY, MM, DD, hh, mm, ss), 'N' | 'S')
      ```
      
  - A single date

      Will generate data for 5 min slices over the entire date provided
      Ex: date(2013, 5, 5) => datetime(2013, 5, 5, 0, 2, 30), datetime(2013, 5, 5, 0, 7, 30), ...
      ```python
      controller.generate(date(YYYY, MMMM, DD), 'N' | 'S')
      ```
  - A list of dates/datetimes

      This will handle each element within the list on a case by case basis, in a bulk job
      ```python
      controller.generate([
          datetime(YYYY, MM, DD, hh, mm, ss),
          date(YYYY, MM, DD),
          ...
      ], 'N' | 'S')
      ```

</exercise>

<exercise id="5" title="Browsing AMGeO Maps">

  Once we have generated AMGeO maps, we might be interested in browsing what maps we have available.

  To do this, the ```controller``` has a ```browse``` method that can be used in two ways.

  1. Browse based on a hemisphere which dates have AMGeO maps already generated.

      ```python
      controller.browse('N' | 'S')
      ```

  2. Specify a date and hemisphere for specific times that AMGeO has generated maps for

      ```python
      controller.browse(date(YYYY, MM, DD), 'N' | 'S')
      ```

  **Question:**
  Browse AMGeO data for the date 1-2-2016 on the southern hemisphere
  <codeblock id="04_03">
    Call ```controller.browse```
  </codeblock>

</exercise>

<exercise id="6" title="Loading AMGeO Data">

  The last and most important piece of AMGeO's new API is the ability to load AMGeO maps into ```Xarray Datasets```, with no work needed other than calling ```controller.load```

  ```load``` supports the same modularity as ```generate```, to allow for you load various dates/datetimes on a given hemisphere into one dataset.

  - A single datetime

      Will load the specific date into a dataset
      ```python
      controller.load(datetime(YYYY, MM, DD, hh, mm, ss), 'N' | 'S')
      ```

  - A single date

      Will load all maps availabe from a date
      ```python
      controller.load(date(YYYY, MM, DD), 'N' | 'S')
      ```

  - A list of dates/datetimes

      Will load each date/datetime respectively from the list. <mark>NOTE</mark> you can load from multiple dates into one dataset
      ```python
      controller.load([
          datetime(YYYY, MM, DD, hh, mm, ss),
          date(YYYY, MM, DD),
          ...
      ], 'N' | 'S')
      ```

  As you may have noticed, it is really easy to plug dates from the ```browse``` method into the ```load``` method
  ```python
  hemi = 'N'
  dates = controller.browse(hemi)
  controller.load(dates, hemi)
  ```

  **Question:**
  Load all AMGeO Data for the date 1-2-2016 on the southern hemisphere
  <codeblock id="04_04">
    ditto
  </codeblock>

</exercise>

<exercise id="7" title="More AMGeO introductory material">

To see some more advanced AMGeO introductory material, please see the recent notebook 
published for Earthcube 2022 going over what you see above in addition to

- More advanced Xarray uses
- Interaction with popular packages like Cartopy, Apexpy
- Plotting examples

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/willemmirkovich/Earthcube-Meeting-2022/HEAD)

Github repo: https://github.com/willemmirkovich/Earthcube-Meeting-2022

</exercise>