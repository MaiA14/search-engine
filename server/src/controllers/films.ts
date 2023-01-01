import * as express from "express";
import { TypedRequest } from "../..";
import fetch from 'node-fetch';
import { APIS } from "../config";
import FilmsService from "../services/films";
import { singleton } from "../decorators/singleton";

@singleton
export default class FilmsController {
    public static controllerName = 'films';
    public middleware: any;
    public path = `/api/${FilmsController.controllerName}`;
    public router: any = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(
            this.path + '/',
            this.getFilmsByTitle
        );
        this.router.get(
            this.path + '/:id',
            this.getFilmById
        );
    }

    // http://localhost:4000/api/films?title=empire
    public async getFilmsByTitle(req: TypedRequest<{ title: string }>, res: express.Response): Promise<void> {
        console.log('getFilms', req.query);
        if (!req.query || req.query && !req.query.title) {
            res.status(404).send('Error - get films, no title supplied');
            return;
        }

        try {
            const filmsByTitleResp = await fetch(`${APIS.FILMS_API}?title=${req.query.title}`)
            const filmsByTitleJSON: any = await filmsByTitleResp.json();
            const films = filmsByTitleJSON.results;

            if (films.length > 0) {
                const listOfTitles = FilmsService.getTitles(films);
                res.send(listOfTitles)
            } else {
                res.status(200).send({ message: 'Cannot find films by this title.' })
            }

        } catch (getFilmsError: any) {
            console.log('getFilmsError ', getFilmsError.stack);
        }
    }

    // http://localhost:4000/api/films/1?expand=characters
    public async getFilmById(req: TypedRequest<{ id: string, expand?: string }>, res: express.Response): Promise<void> {
        console.log('getFilmById', req.params, req.query);

        if (!req.query || req.query && !req.params.id) {
            res.status(404).send('Error - get film, no id supplied');
            return;
        }

        let expand: string;
        if (req.query.expand) {
            expand = req.query.expand;
        }

        try {
            const filmResp = await fetch(`${APIS.FILMS_API}/${req.params.id}`);
            const film: any = await filmResp.json();

            if (film) {
                if (req.query.expand && film[req.query.expand]) {
                    const details = await FilmsService.getExpandedFieldForFilm(film, req.query.expand);
                    console.log(film, details); 
                    res.status(200).send({ film: { [req.query.expand]: details }});
                } else {
                    res.status(200).send({ film: film });
                }
            } else {
                res.status(404).send({ message: 'Cannot find film' })
            }

        } catch (getFilmByIdError: any) {
            console.log('getFilmByIdError ', getFilmByIdError.stack);
        }
    }
}
