---
name: Add an Interactive Map
about: Add a missing interactive map to the list
title: ''
labels: ''
assignees: ''
---

~~~ json
{
    'series': '',
    'entries': [
        {
            'name': '',
            'maps': [
                {
                    'url': '',
                    'locations': [],
                    'purposes': [],
                    'type': '',
                    'source': '',
                    'source_url': '',
                    'quality': ''
                }
            ]
        }
    ]
}
~~~

<!--
type: open|closed|commercial
Is the map completely open source (open),
is the source not available (closed) or
are features locked behind a paywall or ads being displayed (commercial)

quality: high|low
How's the map quality and usability.
-->

<!-- Example
{
    'series': 'The Witcher',
    'entries': [
        {
            'name': '3',
            'maps': [
                {
                    'url': 'https://link-to.map/',
                    'locations': [
                        'Main World',
                        'Abandoned Town'
                    ],
                    'purposes': [
                        'Collectibles',
                        'Treasure Chests',
                    ],
                    'type': 'open|closed|commercial',
                    'source': 'mapgenie.io',
                    'source_url': 'https://link-to-open.source/',
                    'quality': 'high|low'
                },
                {
                    'url': 'https://link-to-second.map/',
                    'locations': [
                        'Abandoned Town'
                    ],
                    'purposes': [
                        'Collectibles'
                    ],
                    'type': 'open|closed|commercial',
                    'source': 'mapgenie.io',
                    'source_url': 'https://link-to-open.source/',
                    'quality': 'high|low'
                }
            ]
        }
    ]
}
-->
