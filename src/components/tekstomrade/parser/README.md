# Simple parser

Simple regex-rule-based parser, see [rules](./rules.ts)

## Sample

**INPUT**

```
This *is* a paragraph.

This is another.

This has *highlighting*.

This is _bold_.

This has links www.google.com, *https://www.yahoo.com*, _http://www.bing.com_

And here we combine them *_highlight bold_*, and reversed _*highlight bold*_, with links; _*www.google.com*_ *_https://yahoo.com_*

The last paragraph
spans multiple lines.
```

**OUTPUT**

```
[
  {
    "name": "Paragraph",
    "content": [
      "This ",
      {
        "name": "Highlight",
        "content": [
          "is"
        ]
      },
      " a paragraph."
    ]
  },
  {
    "name": "Paragraph",
    "content": [
      "This is another."
    ]
  },
  {
    "name": "Paragraph",
    "content": [
      "This has ",
      {
        "name": "Highlight",
        "content": [
          "highlighting"
        ]
      },
      "."
    ]
  },
  {
    "name": "Paragraph",
    "content": [
      "This is ",
      {
        "name": "Bold",
        "content": [
          "bold"
        ]
      },
      "."
    ]
  },
  {
    "name": "Paragraph",
    "content": [
      "This has links ",
      {
        "name": "Link",
        "content": [
          "www.google.com"
        ]
      },
      ", ",
      {
        "name": "Highlight",
        "content": [
          {
            "name": "Link",
            "content": [
              "https://www.yahoo.com"
            ]
          }
        ]
      },
      ", ",
      {
        "name": "Link",
        "content": [
          {
            "name": "Bold",
            "content": [
              "http://www.bing.com"
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Paragraph",
    "content": [
      "And here we combine them ",
      {
        "name": "Highlight",
        "content": [
          {
            "name": "Bold",
            "content": [
              "highlight bold"
            ]
          }
        ]
      },
      ", and reversed ",
      {
        "name": "Bold",
        "content": [
          {
            "name": "Highlight",
            "content": [
              "highlight bold"
            ]
          }
        ]
      },
      ", with links; ",
      {
        "name": "Bold",
        "content": [
          {
            "name": "Highlight",
            "content": [
              {
                "name": "Link",
                "content": [
                  "www.google.com"
                ]
              }
            ]
          }
        ]
      },
      " ",
      {
        "name": "Highlight",
        "content": [
          {
            "name": "Link",
            "content": [
              {
                "name": "Bold",
                "content": [
                  "https://yahoo.com"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Paragraph",
    "content": [
      "The last paragraph",
      {
        "name": "Linebreak",
        "content": []
      },
      "spans multiple lines."
    ]
  }
]
```
