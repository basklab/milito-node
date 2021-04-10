# milito-node
    
    http -v POST "localhost:3000/api/game/setup"



    echo '{
      "discarded_cards": [7, 27],
      "selected_card": 10,
      "selected_column": 3,
      "selected_row": 1,
      "kind": "PlaceUnitEvent"
       }
         ' | http -v POST "localhost:3000/api/game/event"
