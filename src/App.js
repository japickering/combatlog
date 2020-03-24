import React, { Component } from "react";
import player from "./classes/player";
import enemy from "./classes/enemy";
import targetInfo from "./utils/targetiInfo";
import playerDamage from "./actions/playerdamage";
import enemyDamage from "./actions/enemydamage";
import leechLife from "./actions/leechlife";
import weaponDamage from "./actions/weaponDamage";
import powerDamage from "./actions/powerDamage";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.items = [];
    this.player = player;
    this.enemy = enemy;
    this.getCombatLog = this.getCombatLog.bind(this);
    this.onReload = this.onReload.bind(this);
    this.displayModeAll = false;

    this.state = {
      messages: [],
      seconds: 0
    };
  }

  componentDidMount() {
    if (this.displayModeAll) {
      console.log("Mode: all");
      this.items = this.getCombatLog();
      let results = this.items.map(function(item) {
        return item;
      });
      this.setState({
        messages: results
      });
    } else {
      console.log("Mode: timer");
      this.interval = setInterval(() => this.tick(), 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onReload() {
    // clearInterval(this.interval);
    this.setState({
      messages: [],
      seconds: 0
    });
    if (this.displayModeAll) {
      this.items = this.getCombatLog();
      let results = this.items.map(function(item) {
        return item;
      });
      this.setState({
        messages: results
      });
    } else {
      this.interval = setInterval(() => this.tick(), 500);
    }
  }

  fight(pc, npc) {
    return targetInfo(pc) + " fights " + targetInfo(npc);
  }

  getCombatLog() {
    const pc = this.player;
    const npc = this.enemy;
    const styles = {
      message: { color: "#fff" },
      miss: { color: "grey" },
      dmg: { color: "lightgreen" },
      hit: { color: "crimson" },
      heal: { color: "orange" }
    };
    const actions = [
      { text: this.fight(pc, npc), style: styles.message },
      { text: weaponDamage(pc), style: styles.dmg },
      { text: powerDamage(pc), style: styles.dmg },
      { text: playerDamage(pc, npc), style: styles.dmg },
      { text: targetInfo(npc), style: styles.message },
      { text: weaponDamage(npc), style: styles.hit },
      { text: powerDamage(npc), style: styles.hit },
      { text: enemyDamage(pc, npc), style: styles.hit },
      { text: leechLife(pc, npc), style: styles.heal },
      { text: targetInfo(pc), style: styles.message },
      { text: "End combat round", style: styles.message }
    ];

    if (this.displayModeAll) {
      return actions;
    } else {
      const concatItems = this.state.messages.concat(
        actions[this.state.seconds]
      );
      return concatItems;
    }
  }

  tick() {
    const timelimit = 11;
    if (this.state.seconds < timelimit) {
      this.items = this.getCombatLog();
      this.setState(prevState => ({
        messages: this.items,
        seconds: prevState.seconds + 1
      }));
    } else {
      this.setState(prevState => ({
        messages: this.items,
        seconds: prevState.seconds
      }));
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <main>
        <h1>Combat Log</h1>
        <button onClick={this.onReload}>Reload</button>
        <div className='timer'>
          <strong>Seconds:</strong> {this.state.seconds}
        </div>
        <div className='textbox'>
          {this.state.messages.map(item => (
            <div className='damage-message' style={item.style}>
              {item.text}
            </div>
          ))}
        </div>
      </main>
    );
  }
}
