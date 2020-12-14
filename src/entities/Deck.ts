import {Card} from "@entities/Card";

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
}
