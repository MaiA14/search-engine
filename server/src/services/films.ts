import fetch from "node-fetch";

export default class FilmsService {

    public static getTitles(films): Array<any> {
        console.log('getTitles');
        const titles = [];
        if (films.length > 0) {
            films.map((film) => {
                if (film && film.title) {
                    titles.push({item: film.title});
                }
            });
            return titles;
        }
        return []; // handled empty array in controller
    }

    public static async getExpandedFieldForFilm(film: any, expandedFieldName: string): Promise<Array<any>> {
        if (film[expandedFieldName].length > 0) {
            const fieldValues = [];
            for (let i = 0; i < film[expandedFieldName].length; i++) {
                try {
                    const fieldData = await fetch(`${film[expandedFieldName][i]}`);
                    const data: any = await fieldData.json();
                    
                    if (data) {
                        fieldValues.push({item: data.name});
                    } 
                } catch (getExpandedDataError: any) {
                    console.log('getExpandedDataError ', getExpandedDataError.stack);
                }
            }
            
            console.log('fieldValues', fieldValues);
            return fieldValues;
        }
        return []; // handled empty array in controller
    }
}