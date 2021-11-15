<template>
  <p>Upload your file here</p>

	<input accept="image/jpeg, image/png, video/mp4" @change="upload($event)" type="file"/>
</template>

<script lang="ts">
import axios from "axios";

function getCookie(name: string): string|null {
	const nameLenPlus = (name.length + 1);
	return document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0] || null;
}

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	setup() {
		function upload(event: any) {
			const file = event.target.files[0];

			var formData = new FormData();
			formData.append("media", file);

			axios.post("/cdn/", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					"Authorization": <string>getCookie("token")
				}
			}).then((response: any) => {
				console.log(response);
			},(error: any) => {
				console.log(error.value);
			});
		}

    return {
		upload
	};
  },
};
</script>