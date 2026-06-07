import React, { Component } from 'react';
import BootingScreen from './screen/booting_screen';
import Desktop from './screen/desktop';
import LockScreen from './screen/lock_screen';
import ReactGA from 'react-ga4';

export default class Ubuntu extends Component {
	constructor() {
		super();
		this.state = {
			screen_locked: false,
			bg_image_name: 'wall-2',
			booting_screen: true,
			shutDownScreen: false
		};
	}

	componentDidMount() {
		this.getLocalData();
	}

	componentWillUnmount() {
		if (this.bootTimeoutId) {
			clearTimeout(this.bootTimeoutId);
		}
	}

	safeGetLocalStorage = (key) => {
		if (typeof window === 'undefined') return null;
		try {
			return localStorage.getItem(key);
		} catch (e) {
			console.warn('localStorage read blocked by browser privacy settings:', e);
			return null;
		}
	};

	safeSetLocalStorage = (key, value) => {
		if (typeof window === 'undefined') return;
		try {
			localStorage.setItem(key, value);
		} catch (e) {
			console.warn('localStorage write blocked by browser privacy settings:', e);
		}
	};

	setTimeOutBootScreen = () => {
		this.bootTimeoutId = setTimeout(() => {
			this.setState({ booting_screen: false });
		}, 9000);
	};

	getLocalData = () => {
		// Get Previously selected Background Image
		let bg_image_name = this.safeGetLocalStorage('bg-image');
		if (bg_image_name !== null && bg_image_name !== undefined) {
			this.setState({ bg_image_name });
		}

		let booting_screen = this.safeGetLocalStorage('booting_screen');
		if (booting_screen !== null && booting_screen !== undefined) {
			// user has visited site before
			this.setState({ booting_screen: false });
		} else {
			// user is visiting site for the first time
			this.safeSetLocalStorage('booting_screen', false);
			this.setTimeOutBootScreen();
		}

		// get shutdown state
		let shut_down = this.safeGetLocalStorage('shut-down');
		if (shut_down !== null && shut_down !== undefined && shut_down === 'true') this.shutDown();
		else {
			// Get previous lock screen state
			let screen_locked = this.safeGetLocalStorage('screen-locked');
			if (screen_locked !== null && screen_locked !== undefined) {
				this.setState({ screen_locked: screen_locked === 'true' ? true : false });
			}
		}
	};

	lockScreen = () => {
		// google analytics
		ReactGA.send({ hitType: "pageview", page: "/lock-screen", title: "Lock Screen" });
		ReactGA.event({
			category: `Screen Change`,
			action: `Set Screen to Locked`
		});

		const statusBar = document.getElementById('status-bar');
		if (statusBar) statusBar.blur();
		setTimeout(() => {
			this.setState({ screen_locked: true });
		}, 100); // waiting for all windows to close (transition-duration)
		this.safeSetLocalStorage('screen-locked', true);
	};

	unLockScreen = () => {
		ReactGA.send({ hitType: "pageview", page: "/desktop", title: "Custom Title" });

		window.removeEventListener('click', this.unLockScreen);
		window.removeEventListener('keypress', this.unLockScreen);

		this.setState({ screen_locked: false });
		this.safeSetLocalStorage('screen-locked', false);
	};

	changeBackgroundImage = (img_name) => {
		this.setState({ bg_image_name: img_name });
		this.safeSetLocalStorage('bg-image', img_name);
	};

	shutDown = () => {
		ReactGA.send({ hitType: "pageview", page: "/switch-off", title: "Custom Title" });

		ReactGA.event({
			category: `Screen Change`,
			action: `Switched off the Ubuntu`
		});

		const statusBar = document.getElementById('status-bar');
		if (statusBar) statusBar.blur();
		this.setState({ shutDownScreen: true });
		this.safeSetLocalStorage('shut-down', true);
	};

	turnOn = () => {
		ReactGA.send({ hitType: "pageview", page: "/desktop", title: "Custom Title" });

		this.setState({ shutDownScreen: false, booting_screen: true });
		this.setTimeOutBootScreen();
		this.safeSetLocalStorage('shut-down', false);
	};

	render() {
		return (
			<div className="w-screen h-screen overflow-hidden" id="monitor-screen">
				<LockScreen
					isLocked={this.state.screen_locked}
					bgImgName={this.state.bg_image_name}
					unLockScreen={this.unLockScreen}
				/>
				<BootingScreen
					visible={this.state.booting_screen}
					isShutDown={this.state.shutDownScreen}
					turnOn={this.turnOn}
				/>
				<Desktop bg_image_name={this.state.bg_image_name} changeBackgroundImage={this.changeBackgroundImage} />
			</div>
		);
	}
}
