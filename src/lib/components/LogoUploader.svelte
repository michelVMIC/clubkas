<script lang="ts">
  import { Fileupload, Helper, Label } from "flowbite-svelte";

  /** The signed url to which we upload the photo. */
  export let signedUrl: string;

  /** Property to disable previewing area when uploading a photo. */
  export let previewable = true;

  /** When a photo is uploaded this toggles the preview*/
  let showPreview: boolean;

  export let required = true;

  /**
   * We use this value to force a refresh on the <img> previewer and when somebody re-uploads a photo.
   */
  let uploadId = Date.now().toString();

  let photoUrl: string;
  /** The S3 url to the photo that's going to be used in the previewer and that's going to be
   * saved to to our database.*/
  export let photoUploadedUrl: string | null;

  /** The file/image uploaded */
  let files: FileList | undefined;

  /** Uploadeds a file to S3 using the signed url
   *
   * @param file
   *  The file that gets uploaded to S3
   */
  const uploadToS3 = async (file: File) => {
    return await fetch(signedUrl, {
      body: file,
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
    });
  };

  /**
   * A handler to upload file(s) to S3. Whenever the file upload changed
   * TODO: Uploading might take a while on slow connections
   * so it might need to show a loading icon.
   *
   * @param files One or multiple images that need to be uploaded
   */
  async function photoUploadHandler(files: FileList | undefined) {
    showPreview = false;
    if (files) {
      const s3Response = await uploadToS3(files[0]);
      photoUrl = s3Response.url.split("?")[0];

      uploadId = Date.now().toString();
      // Here we add a query string because this way the image preview gets reloaded correctly
      photoUploadedUrl = photoUrl + `?attempts=${uploadId}`;
      showPreview = true;
      return photoUploadedUrl;
    }
  }

  $: photoUploadHandler(files);
</script>

<div class="logo-uploader-section">
  <Label for="photo" class="mb-2">Upload logo</Label>

  <Fileupload
    bind:files
    name="logo-upload"
    id="logo-upload"
    accept="image/png, image/jpeg"
    {required}
    class="file-upload file:bg-[#f55] focus:border-blue-500"
  />
  <Helper class="text-gray-400"><b>PNG</b>, <b>JPG</b> allowed</Helper>
  {#if previewable && showPreview}
    <img src={photoUploadedUrl} alt="preview" class="mx-auto max-w-md max-h-fit" />
  {/if}

  <input type="text" name="logo-src" id="logo-src" hidden bind:value={photoUploadedUrl} />
</div>

<style>
</style>
