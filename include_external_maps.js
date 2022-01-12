var types = ["open", "closed", "commercial"];

// sort alphabetically
external_maps_json.sort((firstEl, secondEl) => {
    var first_name = '';
    if (firstEl.series) {
        first_name = firstEl.series;
    } else {
        first_name = firstEl.name;
    }

    var second_name = '';
    if (secondEl.series) {
        second_name = secondEl.series;
    } else {
        second_name = secondEl.name;
    }

    if (first_name < second_name) { return -1 }
    if (first_name > second_name) { return 1 }
    return 0;
});

types.forEach(type => {
    var external_maps = document.createElement('div');
    external_maps.className = 'X';

    external_maps_json.forEach(game_series_entry => {
        if (game_series_entry.series) {
            var series_title = document.createElement('h3');
            series_title.innerText = game_series_entry.series;
            series_title.className = 'game-series';

            var game_list = document.createElement('ul');
            game_list.className = 'SG';

            game_series_entry.entries.forEach(game_entry => {
                get_game_entry({
                    game: game_entry,
                    game_list: game_list,
                    series: game_series_entry.series,
                    type: type
                });
            });

            if (game_list.firstChild) {
                external_maps.appendChild(series_title);
                external_maps.appendChild(game_list);
            }
        } else {
            var series_title = document.createElement('h3');
            series_title.innerText = game_series_entry.name;
            series_title.className = 'game-series';

            var game_list = document.createElement('ul');
            game_list.className = 'SG';

            get_game_entry({
                game: game_series_entry,
                game_list: game_list,
                type: type
            });

            if (game_list.firstChild) {
                external_maps.appendChild(series_title);
                external_maps.appendChild(game_list);
            }
        }
    });

    if (external_maps.firstChild) {
        var os_title = document.createElement('h2');
        switch (type) {
            case "open":
                os_title.innerText = 'Other Open Source Maps';
                break;
            case "closed":
                os_title.innerText = 'Closed Source Maps';
                break;
            case "commercial":
                os_title.innerText = 'Commercial Maps';
                break;

            default:
                break;
        }

        document.body.appendChild(os_title);
        document.body.appendChild(external_maps);
    }
});

function get_game_entry(args) {
    var defaults = {
        series: ''
    };
    var params = { ...defaults, ...args } // right-most object overwrites

    var game_list_entry = document.createElement('li');
    game_list_entry.className = 'sgLi';

    var game_box = document.createElement('div');
    game_box.className = 'box';

    var title = document.createElement('h4');
    title.innerText = params.game.name;

    var locations_list = document.createElement('ul');
    locations_list.className = 'locations-list';

    var location_entries = {};

    params.game.maps.forEach(map => {
        get_map_entry({
            map: map,
            type: params.type,
            game: params.game.name,
            series: params.series,
            location_entries: location_entries
        });
    });

    Object.entries(location_entries).forEach(location => {
        locations_list.appendChild(location[1]);
    });

    if (locations_list.firstChild) {
        game_list_entry.appendChild(game_box);
        game_box.appendChild(title);
        game_box.appendChild(locations_list);
        params.game_list.appendChild(game_list_entry);
    }
}

function get_map_entry(args) {
    var defaults = {
        series: ''
    };
    var params = { ...defaults, ...args } // right-most object overwrites

    if (params.map.type != params.type) return;

    // Filter out low quality maps
    if (params.map.quality == 'low') return;

    params.map.locations.forEach(location => {
        var id;
        if (params.series && params.series != '') {
            id = params.map.type + ':' + params.series + ':' + params.game + ':' + location;
        } else {
            id = params.map.type + ':' + params.game + ':' + location;
        }

        var location_entry = params.location_entries[id];
        if (!location_entry) {
            location_entry = document.createElement('li');
            location_entry.className = 'location-entry';
            params.location_entries[id] = location_entry;

            var location_title = document.createElement('h5');
            location_title.innerText = location;
            location_entry.appendChild(location_title);
        }

        var purposes_list = location_entry.children[1];
        if (!purposes_list) {
            purposes_list = document.createElement('ul');
        }

        var inner_text = '';
        if (params.map.purposes) {
            inner_text += params.map.purposes.join(' - ');
        }

        if (inner_text == '') {
            inner_text = params.map.source;
        } else {
            inner_text += ' - ' + params.map.source;
        }

        var purposes_list_entry = document.createElement('li');
        purposes_list_entry.className = 's1'

        var purposes_list_entry_link = document.createElement('a');
        purposes_list_entry_link.href = params.map.url;
        purposes_list_entry_link.innerText = inner_text;

        purposes_list_entry.appendChild(purposes_list_entry_link);

        if (params.map.source_url && params.map.source_url != '') {
            var source_link = document.createElement('a');
            source_link.href = params.map.source_url;
            source_link.innerText = "Source";

            purposes_list_entry.appendChild(document.createTextNode(' | '));
            purposes_list_entry.appendChild(source_link);
        }

        purposes_list.appendChild(purposes_list_entry);
        location_entry.appendChild(purposes_list);
        return
    });
}

var input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Search game series…');
input.onkeyup = () => {
    var filter = input.value.toUpperCase();

    var series = document.getElementsByClassName('game-series');
    for (let index = 0; index < series.length; index++) {
        const element = series[index];
        if (element.innerHTML.toUpperCase().indexOf(filter) > -1) {
            element.style.display = '';
            element.nextElementSibling.style.display = '';
        } else {
            element.style.display = 'none';
            element.nextElementSibling.style.display = 'none';
        }

    }
};
var div = document.getElementById('top');
div.setAttribute('style', 'display: flex;justify-content: center;padding: 1% 2% 2% 2%;');
div.appendChild(input);
