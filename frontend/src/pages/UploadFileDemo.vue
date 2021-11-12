<template>
  <p>Upload your file here</p>

	<input accept="image/jpeg, image/png, video/mp4" @change="upload($event)" type="file"/>
</template>

<script lang="ts">
import axios from "axios";

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	setup() {
		function upload(event: any) {
			const file = event.target.files[0];

			var formData = new FormData();
			formData.append("media", file);

			axios.post("/cdn/", formData, {
				headers: {
					"Content-Type": "multipart/form-data"
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