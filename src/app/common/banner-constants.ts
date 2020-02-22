import { Injectable } from '@angular/core'

@Injectable()
export class BannerConstants {

    public banner001: string =`	  _________                                    _________                                     __  .__               
	 /   _____/ ____   ____  __ _________   ____   \\_   ___ \\  ____   ____   ____   ____   _____/  |_|__| ____   ____  
	 \\_____  \\_/ __ \\_/ ___\\|  |  \\_  __ \\_/ __ \\  /    \\  \\/ /  _ \\ /    \\ /    \\_/ __ \\_/ ___\\   __\\  |/  _ \\ /    \\ 
	 /        \\  ___/\\  \\___|  |  /|  | \\/\\  ___/  \\     \\___(  <_> )   |  \\   |  \\  ___/\\  \\___|  | |  (  <_> )   |  \\
	/_______  /\\___  >\\___  >____/ |__|    \\___  >  \\______  /\\____/|___|  /___|  /\\___  >\\___  >__| |__|\\____/|___|  /
	        \\/     \\/     \\/                   \\/          \\/            \\/     \\/     \\/     \\/                    \\/ `;

    public banner002: string =`	   _____                                         ___                                      .                   
	  (        ___    ___  ,   . .___    ___       .'   \\   __.  , __   , __     ___    ___  _/_   \`   __.  , __  
	   \`--.  .'   \` .'   \` |   | /   \\ .'   \`      |      .'   \\ |'  \`. |'  \`. .'   \` .'   \`  |    | .'   \\ |'  \`.
	      |  |----' |      |   | |   ' |----'      |      |    | |    | |    | |----' |       |    | |    | |    |
	 \\___.'  \`.___,  \`._.' \`._/| /     \`.___,       \`.__,  \`._.' /    | /    | \`.___,  \`._.'  \\__/ /  \`._.' /    |`;

    public banner003: string =`	  _____                             _____                            _   _             
	 / ____|                           / ____|                          | | (_)            
	| (___   ___  ___ _   _ _ __ ___  | |     ___  _ __  _ __   ___  ___| |_ _  ___  _ __  
	 \\___ \\ / _ \\/ __| | | | '__/ _ \\ | |    / _ \\| '_ \\| '_ \\ / _ \\/ __| __| |/ _ \\| '_ \\ 
	 ____) |  __/ (__| |_| | | |  __/ | |___| (_) | | | | | | |  __/ (__| |_| | (_) | | | |
	|_____/ \\___|\\___|\\__,_|_|  \\___|  \\_____\\___/|_| |_|_| |_|\\___|\\___|\\__|_|\\___/|_| |_|
	                                                                                       `;
	public banner004: string = `	  _   _   _   _   _   _     _   _   _   _   _   _   _   _   _   _  
	 / \\ / \\ / \\ / \\ / \\ / \\   / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ 
	( S | e | c | u | r | e ) ( C | o | n | n | e | c | t | i | o | n )
	 \\_/ \\_/ \\_/ \\_/ \\_/ \\_/   \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ `;

    public banner005: string = `	 _______                                ______                                __   __              
	|     __|.-----.----.--.--.----.-----. |      |.-----.-----.-----.-----.----.|  |_|__|.-----.-----.
	|__     ||  -__|  __|  |  |   _|  -__| |   ---||  _  |     |     |  -__|  __||   _|  ||  _  |     |
	|_______||_____|____|_____|__| |_____| |______||_____|__|__|__|__|_____|____||____|__||_____|__|__|`;

	public banner006: string = `	____ ____ ____ _  _ ____ ____    ____ ____ _  _ _  _ ____ ____ ___ _ ____ _  _ 
	[__  |___ |    |  | |__/ |___    |    |  | |\\ | |\\ | |___ |     |  | |  | |\\ | 
	___] |___ |___ |__| |  \\ |___    |___ |__| | \\| | \\| |___ |___  |  | |__| | \\| `;

	public banner007: string = `	 _____                            _____                             _   _             
	/  ___|                          /  __ \\                           | | (_)            
	\\ \`--.  ___  ___ _   _ _ __ ___  | /  \\/ ___  _ __  _ __   ___  ___| |_ _  ___  _ __  
	 \`--. \\/ _ \\/ __| | | | '__/ _ \\ | |    / _ \\| '_ \\| '_ \\ / _ \\/ __| __| |/ _ \\| '_ \\ 
	/\\__/ /  __/ (__| |_| | | |  __/ | \\__/\\ (_) | | | | | | |  __/ (__| |_| | (_) | | | |
	\\____/ \\___|\\___|\\__,_|_|  \\___|  \\____/\\___/|_| |_|_| |_|\\___|\\___|\\__|_|\\___/|_| |_|`;

	public banner08: string = `	____ ____ ____ ____ ____ ____ _________ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ 
	||S |||e |||c |||u |||r |||e |||       |||C |||o |||n |||n |||e |||c |||t |||i |||o |||n ||
	||__|||__|||__|||__|||__|||__|||_______|||__|||__|||__|||__|||__|||__|||__|||__|||__|||__||
	|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/_______\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|/__\\|
    `;
    
    // Array for all banner strings
    public bannerArray = [this.banner001,this.banner002,this.banner003,this.banner004,this.banner005,this.banner006,this.banner007];
}