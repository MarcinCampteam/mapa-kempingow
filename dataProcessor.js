// Wczytaj dane z pliku KML i podziel je na kategorie
const categories = {
    camping: [],
    tents: [],
    attractions: [],
    parking: []
};

function processKML(kmlUrl) {
    return new Promise((resolve, reject) => {
        omnivore.kml(kmlUrl)
            .on('ready', function () {
                this.eachLayer(function (layer) {
                    const properties = layer.feature?.properties || {};
                    const name = properties.name || "Brak nazwy";
                    const description = properties.description || "Brak opisu";
                    const latLng = layer.getLatLng();

                    // Tworzymy obiekt lokalizacji
                    const location = {
                        name: name,
                        description: description,
                        latLng: [latLng.lat, latLng.lng]
                    };

                    // Dodajemy lokalizację do odpowiedniej kategorii
                    if (properties["Yes_Kemping"] === "Yes_Kemping") {
                        categories.camping.push(location);
                    }
                    if (properties["Yes_Pola_Namiotowe"] === "Yes_Pola_Namiotowe") {
                        categories.tents.push(location);
                    }
                    if (properties["Yes_Atrakcje"] === "Yes_Atrakcje") {
                        categories.attractions.push(location);
                    }
                    if (properties["Yes_Parkingi"] === "Yes_Parkingi") {
                        categories.parking.push(location);
                    }
                });

                resolve(categories);
            })
            .on('error', function (e) {
                reject(`Błąd ładowania pliku KML: ${e.error}`);
            });
    });
}

// Eksportuj funkcję i dane
export { processKML, categories };
