import {Card, IUnitCard} from "@entities/Card";

class IDeck {
    cards: Card[]

    constructor(props: IDeck) {
        this.cards = props.cards
    }
}


export default class Deck extends IDeck {

    public static makeEmpty(): Deck {
        return new Deck({cards: []})
    }

    public pop(): Card {
        const tmp = this.cards.pop()
        if (typeof tmp === 'undefined') {
            throw Error()
        }
        return tmp
    }

    protected static multiply(n: number, x: IUnitCard): IUnitCard[] {
        let result = []
        for (let i=0; i < n; i++) {
            result.push(x)
        }
        return result
    }


    protected static semi_random(seed: number) {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    protected static shuffle(array: Card[], seed: number): Card[] {                // <-- ADDED ARGUMENT
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(this.semi_random(seed) * m--);        // <-- MODIFIED LINE

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
            ++seed                                     // <-- ADDED LINE
        }

        return array;
    }

}
