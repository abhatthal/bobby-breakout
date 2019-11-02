//generates random string of length 16
export function genID(){
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
	var id = ""
	for(let i = 0; i < 16; i++){
		id += chars.charAt(Math.round(Math.random() * chars.length));
	}
	return id;
}

export async function loadImage(imageUrl) {
	let img;
    const imageLoadPromise = new Promise(resolve => {
        img = new Image();
        img.onload = resolve;
        img.src = imageUrl;
    });

    await imageLoadPromise;
    return img;
}