import {Card} from "@entities/Card";
import * as util from "util";

export class IHand {
    cards: Array<Card>

    constructor(props: IHand) {
        this.cards = props.cards
    }
}



export default class Hand extends IHand {

    public static makeEmpty(): Hand {
        const tmp: Array<Card> = []
        return new Hand({cards: tmp})
    }

    public push(card: Card): Hand {
        this.cards.push(card)
        return this
    }

    toString() {
        return "(LP " + (this.cards.map(x => x.toString()).join(" ")) + " RP)"
    }

    // [util.inspect.custom](depth: number, opts: Object) {
    //     return "(LP " + (this.cards.map(x => util.inspect(x)).join(" ")) + " RP)"
    // }

}
