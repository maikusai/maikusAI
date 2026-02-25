# NeuroFlow AI Video Assets Guide

To make the "Show Demo" buttons on the Services page work properly, you need to create a folder called `videos` inside your `public` directory, and place the corresponding video files there.

The mapping relies on the `id` of each service. 

### Step 1: Create the directory
Create `public/videos/` if it does not already exist.

### Step 2: Naming the Video Files
Please rename your `.mp4` video files exactly as follows and place them inside `public/videos/`:

1. **AI Email Systems**: Name the file `email-demo.mp4`
   * Target Path: `/public/videos/email-demo.mp4`
2. **Lead Generation Systems**: Name the file `leadgen-demo.mp4`
   * Target Path: `/public/videos/leadgen-demo.mp4`
3. **AI Chatbots**: Name the file `chatbots-demo.mp4`
   * Target Path: `/public/videos/chatbots-demo.mp4`
4. **Automation Workflows**: Name the file `workflows-demo.mp4`
   * Target Path: `/public/videos/workflows-demo.mp4`
5. **Custom AI Development**: Name the file `custom-demo.mp4`
   * Target Path: `/public/videos/custom-demo.mp4`

### Note
Because these are loaded locally via Vite, anything in the `/public` folder is served at the root URL path. The app expects them to be at `/videos/<filename>.mp4`.
