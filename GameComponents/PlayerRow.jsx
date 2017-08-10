import React from 'react';

import AdditionalCardPile from './AdditionalCardPile.jsx';
import CardCollection from './CardCollection.jsx';
import PlayerHand from './PlayerHand.jsx';

class PlayerRow extends React.Component {
    constructor() {
        super();

        this.onDrawClick = this.onDrawClick.bind(this);
        this.onShuffleClick = this.onShuffleClick.bind(this);
        this.onShowDeckClick = this.onShowDeckClick.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onCloseAndShuffleClick = this.onCloseAndShuffleClick.bind(this);

        this.state = {
            showDrawMenu: false
        };
    }

    onCloseClick() {
        if(this.props.onDrawClick) {
            this.props.onDrawClick();
        }
    }

    onCloseAndShuffleClick() {
        if(this.props.onDrawClick) {
            this.props.onDrawClick();
        }

        if(this.props.onShuffleClick) {
            this.props.onShuffleClick();
        }
    }

    onDrawClick() {
        this.setState({ showDrawMenu: !this.state.showDrawMenu });
    }

    onShuffleClick() {
        if(this.props.onShuffleClick) {
            this.props.onShuffleClick();
        }
    }

    onShowDeckClick() {
        if(this.props.onDrawClick) {
            this.props.onDrawClick();
        }
    }

    getOutOfGamePile() {
        let pile = this.props.additionalPiles['out of game'];

        if(!pile || pile.cards.length === 0) {
            return;
        }

        return (
            <AdditionalCardPile
                className='additional-cards'
                isMe={ this.props.isMe }
                onDragDrop={ this.props.onDragDrop }
                onMouseOut={ this.props.onMouseOut }
                onMouseOver={ this.props.onMouseOver }
                pile={ pile }
                source='out of game'
                spectating={ this.props.spectating }
                title='Out of Game' />
        );
    }

    render() {
        var drawDeckMenu = [
            { text: 'Show', handler: this.onShowDeckClick, showPopup: true },
            { text: 'Shuffle', handler: this.onShuffleClick}
        ];

        var drawDeckPopupMenu = [
            { text: 'Close', handler: this.onCloseClick},
            { text: 'Close and Shuffle', handler: this.onCloseAndShuffleClick}
        ];

        return (
            <div className='player-home-row'>
                <div className='deck-cards'>
                    <PlayerHand
                        cards={ this.props.hand }
                        isMe={ this.props.isMe }
                        onCardClick={ this.props.onCardClick }
                        onDragDrop={ this.props.onDragDrop }
                        onMouseOut={ this.props.onMouseOut }
                        onMouseOver={ this.props.onMouseOver } />
                    <CardCollection className='draw' title='Draw' source='draw deck' cards={ this.props.drawDeck }
                        onMouseOver={ this.props.onMouseOver } onMouseOut={ this.props.onMouseOut } onCardClick={ this.props.onCardClick }
                        popupLocation={ this.props.isMe || this.props.spectating ? 'top' : 'bottom' } onDragDrop={ this.props.onDragDrop }
                        menu={ drawDeckMenu } hiddenTopCard cardCount={ this.props.numDrawCards } popupMenu={ drawDeckPopupMenu } />
                    <CardCollection className='discard' title='Discard' source='discard pile' cards={ this.props.discardPile }
                        onMouseOver={ this.props.onMouseOver } onMouseOut={ this.props.onMouseOut } onCardClick={ this.props.onCardClick }
                        popupLocation={ this.props.isMe || this.props.spectating ? 'top' : 'bottom' } onDragDrop={ this.props.onDragDrop } />
                    <CardCollection className='dead' title='Dead' source='dead pile' cards={ this.props.deadPile }
                        onMouseOver={ this.props.onMouseOver } onMouseOut={ this.props.onMouseOut } onCardClick={ this.props.onCardClick }
                        popupLocation={ this.props.isMe || this.props.spectating ? 'top' : 'bottom' } onDragDrop={ this.props.onDragDrop } orientation='kneeled' />
                    { this.getOutOfGamePile() }
                </div>
            </div>
        );
    }
}

PlayerRow.displayName = 'PlayerRow';
PlayerRow.propTypes = {
    additionalPiles: React.PropTypes.object,
    deadPile: React.PropTypes.array,
    discardPile: React.PropTypes.array,
    drawDeck: React.PropTypes.array,
    hand: React.PropTypes.array,
    isMe: React.PropTypes.bool,
    numDrawCards: React.PropTypes.number,
    onCardClick: React.PropTypes.func,
    onDragDrop: React.PropTypes.func,
    onDrawClick: React.PropTypes.func,
    onMenuItemClick: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onShuffleClick: React.PropTypes.func,
    plotDeck: React.PropTypes.array,
    power: React.PropTypes.number,
    showDrawDeck: React.PropTypes.bool,
    spectating: React.PropTypes.bool
};

export default PlayerRow;
