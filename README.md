# Time format ticks

Given a list of timestamps, it recognizes the time interval necessary to represent the dates (*15 seconds*, *minute*, *30 minutes*, *hourly*, *daily*, *weekly*, *monthly*, *quarterly* or *yearly*) and formats the ticks accordingly.

Two possible formats (*primary* and *secondary*) are associated with each time interval which can be used to format the current tick.
*Primary* format was designed to represent the value (the date corresponding to the tick) in a more exhaustive and detailed way, while the *secondary* format represents the value in a concise way.\
*Primary* tick format is used for the first tick and when something happens between the last and the current ticks based on the time interval.

For example if time interval is *daily*, I'm probably interested to see a primary tick on the first tick and every time a ticks rapresents a date which month or year is changed respet to the previous tick.
The remaining ticks are formatted using the *secondary* format.

So I can describe this logic using this schema:

    daily:
      primary: "MMM d"
      secondary: "d"

      primary:
        * first tick
        * change month
        * change year
      secondary:
        * otherwise

What does it means?\
Exactly the same described above: if time interval is *daily*, the primary formta tick has the format `MMM d`, the secondary format tick has the format `d` so the primary tick actually describes the date more precisely because it shows the month and day, while the secondary format tick shows only the day.\
The primary format tick is used on the first tick and when there is a change of month or year, in all the other cases it's being used the secondary format tick.

Below there is a short diagram on how ticks are formatted:

    15seconds: 
      primary: "MMM d, pp"
      secondary: "pp"

      primary:
        * first tick
        * change day of month
        * change month
        * change year
      secondary:
        * otherwise

    minute: 
      primary: "MMM d, p"
      secondary: "p"

      primary:
        * first tick
        * change day of month
        * change month
        * change year
      secondary:
        * otherwise

    30minutes: 
      primary: "MMM d, p"
      secondary: "p"

      primary:
        * first tick
        * change day of month
        * change month
        * change year
      secondary:
        * otherwise

    hourly:
      primary: "MMM d, hh a"
      secondary: "hh a"

      primary:
        * first tick
        * change day of month
        * change month
        * change year
      secondary:
        * otherwise

    daily:
      primary: "MMM d"
      secondary: "d"

      primary:
        * first tick
        * change month
        * change year
      secondary:
        * otherwise

    weekly: 
      primary: "eee, MMM d"
      secondary: "eee"

      primary:
        * first tick
        * change week
        * change year
      secondary:
        * otherwise

    monthly: 
      primary: "MMM yyyy"
      secondary: "MMM"

      primary:
        * first tick
        * change year
      secondary:
        * otherwise

    quarterly:
      primary: "QQQ ''yy"
      secondary: "QQQ"

      primary:
        * first tick
        * first quarter
      secondary:
        * otherwise

    yearly: 
      primary: "yyyy"
      secondary: "yyyy"

      primary:
        * never
      secondary:
        * otherwise
  
**Note**: as you can see in the above diagram, the *weekly* time interval doesn't exist. It works as *daily* but it shows the day names instead of the day numbers and user can choose the format using the `showDayName` option.

**Note**: if the dataset has only one datum, we show the tick in the most detailed way possible using *15 seconds* time interval.

Where:

- `MMM`: short name of the month (ie. *Jan-Dec*)
- `d`: day of the month (ie. *1-31*)
- `pp`: long localized time (ie. *12:00:00 AM*)
- `p`: long localized time (ie. *12:00 AM*)
- `hh`: hour [1-12] (ie. *01, 02, ..., 11, 12*)
- `a`: *AM*, *PM*
- `eee`: local day of week (ie. *Mon, Tue, Wed, ..., Su*)
- `yyyy`: calendar year (ie. *2010, 2017*)
- `yy`: calendar year (ie. *10, 17*)
- `QQQ`: quarter (ie. *Q1, ..., Q4*).

`primary` and `secondary` specify the format of the formatted tick. The format of this string is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).\
More info on the [`date-fns` documentation](https://date-fns.org/v2.8.1/docs/format).

---

## Customization

You can customize both the primary and the secondary format. You can also, as said before, chose to show the day as number or as day name. also, you can change the Locale.
All of those things are possible using the `Options` object.

### Change the formats

If you prefer to show hours using 24h and not 12h as default, you can descbribe the formats in this way:

    const options = {
      formats: {
        'hourly': { primary: 'MMM d, HH:mm', secondary: 'HH:mm' },
      }
    }

If you prefer to show year as 2-digit instead of 4 for yearly time interval:

    const options = {
      formats: {
        'yearly': { primary: 'yy', secondary: 'yy' },
      }
    }

An infinte number of combination are possible, the important thing is to use the [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).

### Choose how to show days

If you prefer to show day as day name instead of day number, you can set the showDayName option to true and `[1, 2, ..., 31]` become `[Monday, Tuesday, ..., Sunday]`.

### Change Locale

Default locale is english-US but the user can choose the one he prefers. The available locale objects are those supported by `date-fns`. [Here](https://github.com/date-fns/date-fns/tree/master/src/locale) is the list.

Basically by changing the locale only the language of the labels change.
To change the formats of the labels according to a locale the only possibility is to add a new `formats`. This is an open problem.

Each option value is optional.

### Demo screenshots

### Demo page

A depo page is avaible, you can run it using `yarn start:demo`.

# TODO

- [ ] Badge con test e coverage.
- 