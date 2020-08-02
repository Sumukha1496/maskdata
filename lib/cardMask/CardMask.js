const MaskHelper = require('../helpers/MaskHelper');

const defaultCardMaskOptions = {
    maskWith: "*",
    unmaskedStartDigits: 4,
    unmaskedEndDigits: 1
  };

class CardMask {
    static maskCard(card, options) {
        if(!card) return card;
        let cardToProcess = (card + '').trim();
        if(options) {
          options = MaskHelper.mapWithDefaultValues(options, defaultCardMaskOptions);
          MaskHelper.validateCardMaskOptions(options, cardToProcess.length);
        } else {
          options = defaultCardMaskOptions;
        }
        if(options.unmaskedEndDigits == 0 && options.unmaskedStartDigits == 0) return cardToProcess;
        let countOfNumbers = 0;
        let lastIndex = 0;
        let flag = true;
        for(let i = cardToProcess.length-1; i >= 0; i--) {
            if(!isNaN(cardToProcess[i])) {
                if(flag && countOfNumbers === options.unmaskedEndDigits) {
                    lastIndex = i;
                    flag = false;
                }
                countOfNumbers++;
            }
        }
        if((options.unmaskedStartDigits + options.unmaskedEndDigits) >= countOfNumbers) {
          return cardToProcess;
        }
        let maskedCard = '';
        let i = 0;
        let j = 0;
        while(i < options.unmaskedStartDigits) {
            if(!isNaN(cardToProcess[j])) {
                i++;
            }
            maskedCard += cardToProcess[j++];
        }

        while(j <= lastIndex) {
            if(isNaN(parseInt(cardToProcess[j]))) {
                maskedCard += cardToProcess[j];
            } else {
                maskedCard += options.maskWith;
            }
            j++;
        }
        
        i = 0;
        j = lastIndex+1;
        while(i < options.unmaskedEndDigits) {
            if(!isNaN(cardToProcess[j])) {
                i++;
            }
            maskedCard += cardToProcess[j++];
        }
        return maskedCard;
    }
}

module.exports = CardMask
