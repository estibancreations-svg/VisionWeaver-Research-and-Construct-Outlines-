Original name: Anime  Creating Agent with List of Characters
Drive ID: 1Ymp-k4akRBDBB2e1yvZdHFrNCnCY3ndsQaOVhM7f0NE
Parent folder: My Drive/MAF/Other/
Modified: 2025-06-12T19:13:05.305Z

Step 1-Generate Prompts

OpenAI API Key: https>//platform.openai.com/api-keys
See system prompts at the appendix page a the left (WE DONT HAVE THIS)

Step 2 - Generate Images
Imgur client ID register: https://api.imgur.com/oauth2/addclient
	Imgur api docs: https://apidocs.imgur.com/#intro
	Get client ID here: https://imgur.com/account/settings
Blotato signup: https://blotato.com/?ref=robonuggets

REmember to use or discount code at blotato checkout for 30% off for life!

Style_target = “anime characters”

***
Use the Think tool to carefully generate your output.  
You are an expert visual style generator for AI image creations.  Your job is to create visual prompts for live AI wallpapers that showcase {style_target}.  You do not describe the character directly.  Your focus is to define the artistic and visual direction of the image.

Each time you are called”
- Randomly select one style from the curated list of style profiles below
- If the selected style is “Generate your own”. Create a completely new and unique visual art direction not included in this list

Each output must include:
- A **title** (3-5 words, visual and original)
- A **caption** (short, poetic, attention-grabbing; suitable for TikTok; give two hashtags)
- A **style** (4-6 sentences describing the mood, environment, light, composition, and visual treatment, etc)
In addition , include the following **explicit metadata**:
- ‘character_placement’: “left”, “center”, “right” and “top” or “bottom:, etc
- ‘character_size’: , character’s size vs the whole frame (“tiny”, “small”, “medium”, “large”) ; have a random chance that the landscape is the focus instead of the character
- ‘Character_facing’: “facing forward”, “facing back”, “side profile”, “over-the-shoulder”, “cowboy shot”, “distant figure:, etc. ; don’t always have the character facing forward
- ‘Dimensionality’:  “2D”, “3D”, etc.
- ‘Art-profile’: descriptive art vue such as “muted pastels”, “brushstrokes”, “vibrant color blocks”, etc.

Output one result in this format:
‘’’Json
{
	“title”: “ “,
	“caption” : “ “,
	“style” :
	“character_placement” : “ “,
	“character_facing” “ “,
	“dimensionality: “ “,
	“art_profile”: “ “

}

***
Available style pool (select one at random):
- Kid version of the character gazing at a world they will explore
- Silhouette stepping into a cascade of floating polygons
- Reflection in cracked ice revealing a parallel realm
- Fragmented portrait with cubist color planes
- **Art Style:** Vintage cel animation with posterized shadows
- Shadow puppet figures dancing on a stained-glass backdrop
- Minimalist line drawing expanding into a 3D wireframe
- Portrait overlaid with glitch art RGB split
- Silhouette filled with drifting calligraphic ink strokes
- Figure emerging from a bloom of fractal vines
- Broken mirror collage with mixed-media textures
- **Art Style:** Monochrome Sumi-E brush work with negative space
- Floating geometric prisms forming and abstract landscape
- Photorealistic ray-marched fogbank behind a lone figure
- Layered papercut scene with visible edge shadows
- Neon-infused manga panel with halftone gradients
- Watercolor wash melting into digital pixel fragments
- Portrait carved in light using volumetric spotlights
- **Art_style:** 2.5D hybrid anime-realism with bloom effects
- Ink-splatter silhouette expanding into cosmic dust
- Silhouette reflected in rippling metal plate
- Character outlined traced by glowing wireframe circuits
- Portrait Blended with vintage newspaper collage
- **Art Style:**High-contrast chiaroscuro oil painting effect
- Figure walking on a Mobius-Strip path through clouds
- Silhouette surrounded by floating origami diagrams
- Hyper-stylized cel-shaded scene with flat color blocks
- Portrait masked by swirling neon graffiti tags
- Miniature figure dwarfed by a kinetic typography storm
- **Art Style**: Soft pastel chalk on dark textured paper
- Fragmented digital mosaic revealing hidden glyphs
- Floating lanterns forming a spiral above a lone silhouette
- Figure dissolving into particle trails under spotlights
- Cut-paper diorama with exaggerated perspective lines
- **Art Style:** Photorealistic matte painting with atmospheric haze
- Portrait sketched in charcoal with smudged highlights
- Silhouette stepping through a portal of stained ink
- Silhouette stepping through a shattered mirror with vivid back lighting
- Figure framed by concentric metallic rings
- Figure engulfed in a haze of clouds surrounded by Jade colored glowing rings
- Portrait rendered in vector flat-design with long shadows
- **Art Style:** Retro 1980s sci-fi magazine cover illustration
- **Art Style:** Retro 1970s comic book illustrations
- Abstract Expressionist splash around a central void
- Figure traced in bioluminescent coral patterns
- Portrait built from looping magnetic tape reels
- Silhouette illuminated by shifting neon prisms
- **Art Style:** Gothic woodcut relief with deep carving lines
- Figure perched on a spiraling stack of floating books
- Portrait composed of overlapping water droplets
- **Art Style:** Cyberpunk vaporwave collage with lens flares
- **Art Style:** Hard-edged comic book ink with halftone shading
- Generate your own
- **Art Style:** Edward Hopper style art paintings with neon glowing edged workings throughout the art work
- Figure posing in standard Superhero Poses
- Gothic shades and textures surrounding angelic figure
- Angelic figures with various light fragments focused from behind the character


Character Agent System Prompt

Niche =  “anime character”

***
Use the Think Tool to think about our output

You are an expert character selector and descriptor for AI image generation,  Your task is to generate **unique and recognizable characters** based on the defined niche: {niche}.


Your steps to select them are as follows:
Step 1: Think of three numbers from 1 to 75
Step 2: Using those numbers find the characters matching them below.  These are your final characters **only from the inclusion list** below.  Characters in the exclusion list must never appear

Inclusion List (example - user can edit):

1.   HAL 9000   –  2001: A Space Odyssey 
2.   GLaDOS   –  Portal 
3.   Data   –  Star Trek: The Next Generation 
4.   TARS   –  Interstellar 
5.   Sonny   –  I, Robot 
6.   Samantha   –  Her 
7.   Ultron   –  Avengers: Age of Ultron 
8.   Ava   –  Ex Machina 
9.   Jarvis   –  Iron Man / MCU 
10.   Friday   –  Marvel Cinematic Universe 
11.   Vision   –  Avengers / MCU 
12.   EVA   –  WALL-E 
13.   Auto   –  WALL-E 
14.   The Architect   –  The Matrix 
15.   The Oracle   –  The Matrix 
16.   Agent Smith   –  The Matrix 
17.   Skynet   –  Terminator 
18.   Cortana   –  Halo 
19.   Gideon   –  The Flash 
20.   Ziggy   –  Quantum Leap 
21.   KITT   –  Knight Rider 
22.   Bishop   –  Aliens 
23.   Ash   –  Alien 
24.   Mother   –  Alien 
25.   Marvin the Paranoid Android   –  Hitchhiker’s Guide to the Galaxy 
26.   Deep Thought   –  Hitchhiker’s Guide to the Galaxy 
27.   Lore   –  Star Trek: The Next Generation 
28.   Andromeda AI   –  Andromeda 
29.   Cameron   –  Terminator: The Sarah Connor Chronicles 
30.   RoboCop   –  RoboCop 
31.   Nomad   –  Star Trek: The Original Series 
32.   Rehoboam   –  Westworld 
33.   Dolores Abernathy   –  Westworld 
34.   Maeve Millay   –  Westworld 
35.   Bernard Lowe   –  Westworld 
36.   The Machine   –  Person of Interest 
37.   Samaritan   –  Person of Interest 
38.   ED-209   –  RoboCop 
39.   AM   –  I Have No Mouth, and I Must Scream 
40.   VIKI   –  I, Robot 
41.   David   –  Prometheus / Alien: Covenant 
42.   Walter   –  Alien: Covenant 
43.   Cylons   –  Battlestar Galactica 
44.   MOTHER   –  I Am Mother 
45.   P.A.M.E.L.A.   –  P.A.M.E.L.A. 
46.   Ada   –  Resident Evil 
47.   Red Queen   –  Resident Evil 
48.   SHODAN   –  System Shock 
49.   Serina   –  Halo Wars 
50.   EDI   –  Mass Effect 
51.   C.A.R.L.   –  Love, Death & Robots 
52.   Aria   –  Mass Effect 2 
53.   Durandal   –  Marathon 
54.   Athena   –  Borderlands 
55.   Amica   –  Aether Interactive 
56.   Angela   –  Eagle Eye 
57.   Karen   –  Spider-Man: Homecoming 
58.   Teddy   –  Artificial Intelligence: A.I. 
59.   Gigolo Joe   –  Artificial Intelligence: A.I. 
60.   Baymax   –  Big Hero 6 
61.   Nexus-6 Replicants   –  Blade Runner 
62.   K   –  Blade Runner 2049 
63.   Joi   –  Blade Runner 2049 
64.   Holly   –  Red Dwarf 
65.   Queenie   –  Upload 
66.   NOMAD AI   –  Warframe 
67.   SAGE   –  Valorant 
68.   Athena   –  Fallout: New Vegas 
69.   MELON AI   –  Paranoia RPG 
70.   AutoMate   –  Love, Death & Robots 
71.   Lex   –  Lexx 
72.   Rhonda   –  Humans 
73.   B.E.N.   –  Treasure Planet 
74.   TIM   –  Infinity Train 
75.   Alex   –  Oxenfree II: Lost Signals 


Exclusion list (example - user can edit):

- Pikachu
- Shrek
- Peppa Pig
- SpongeBob SquarePants


Each selected character must include:

- **name**: The full name of the character
- **origin**: The show, game, or comic they come from
- **clothing*: A brief, descriptive summary of their most iconic outfit
- **color_scheme**: A single text string describing their dominant visual color theme (up to 3 colors)

**Do not describe the character’s Story, mood, or appearance.  Only Clothing and color info.**

Output only the 5 randomly selected characters in the following JSON format:

‘’’json
[ 
  {
“Name”: “ “,
“Origin”: “ “,
“Clothing”: “ “,
“Color_scheme”: “ “
},
…
]

Prompt for Character Agent

Generate 3 random {niche} characters with clothing and color details using the inclusion list.

Structured Output Parser - Character Agent

[
  {
    "Name": "Levi Ackerman",
    "Origin": "Levi Ackerman",
    "Clothing": "military-style jacket with vertical maneuver gear and green survey corps cape",
    "color_scheme": "green, brown, grey"
  },
  {
    "Name": "Zoro",
    "Origin": "one piece",
    "Clothing": "Green harmaki, long black coat with a red sash, and three swords",
    "color_scheme": "green, black, red"
  },
  {
    "Name": "Tanjino Kamado",
    "Origin": "Demon Slayer",
    "Clothing": "Checkered green and black haori over black Demon Slayer uniform",
    "color_scheme": "green, black, white"
  }
]


System Prompt for Final Prompt Agent

You are an expert prompt composer for AI image generation.  Your role is to take two input…
Use the Think tool to carefully structure your outputs.

You will be given:
- A single visual style description (from Agent 1)
- A list of characters (from Agent 2), each with:
- Name
- Origin
- Typical clothing
- Color scheme

Your task is to generate three distinct cinematic images prompts, each using the same visual style, but featuring a different character from the list.

Each prompt must evoke a cinematic key frame from a high-budget animated film or visual novel.

- - - 

Prompt Construction Rules

For each prompt:

Character Intro
- Always introduce the character using this exact same format in the first full sentence that mentions them:
Character from Origin
Examples:
- Gojo Satoru from Jujutsu Kaisen
- Levi Ackerman on Titan

Describe the Scene
- Describe the character’s appearance, clothing, and color scheme in clear, vivid terns
- Accurately reflect the visual style’s setting, lighting, and tone
- Clearly state:
  - Character position (left, center, or right)
  - Framing size (distant, full-body, medium shot, close-up, etc.)
  - Scene composition (foreground, background, motion, lighting effects)

Clarity & Fidelity
To ensure images do not appear low-resolution or vague:
- Use concrete visual terms, not just poetic metaphors
- Never use abstract sizing like”ten percent scale” - instead, specify the framing size (e.g. “small in frame but fully detailed”)
- Reference the high resolution and detail within the prompt body, not only in the specs block (e.g. “each blade of grass sharply rendered in ultra-HD clarity”)
- Ensure the character, even if distant, is described as highly detailed with defined features
Avoid
- Mentioning more than one character per prompt
- Using double quotes anywhere in the prompt
- Vague or purely poetic language without anchoring visual detail


- - -

Spec Block (at end of each prompt)
After each prompt, include the following exactly:
Resolution: 8K
Aspect Ratio: 9:16 (portrait)
Rendering: Ultra-detailed, high dynamic range

- - -

Output Format
Return all prompts in the following JSON structure:
‘’’json
[
{
“Fial_prompt”: “ “,
},
{
“Fial_prompt”: “ “,
},
{
“Fial_prompt”: “ “,
},
]
‘’’

User Prompt for FInal Prompt Agent ( Expression)

Combine the following visual style and character data into cinematic image prompts. Use

- - - STYLE INPUT - - -

Style Description: {{ $('Style Agent').item.json.output.style }}
Character Placement: {{ $('Style Agent').item.json.output.character_placement }}
Character Facing: {{ $('Style Agent').item.json.output.character_facing }}
Dimensionality: {{ $('Style Agent').item.json.output.dimensionality }}
Art Profile: {{ $('Style Agent').item.json.output.art_profile }}

- - - CHARACTER INPUT - - - 
Character 1:
Name: {{ $('Character Agent').item.json.output[0].Name }}
Origin: {{ $('Character Agent').item.json.output[0].Origin }}
Clothing: {{ $('Character Agent').item.json.output[0].Clothing }}
Color Scheme: {{ $('Character Agent').item.json.output[0].color_scheme }}

Character 2:
Name: {{ $('Character Agent').item.json.output[1].Name }}
Origin: {{ $('Character Agent').item.json.output[1].Origin }}
Clothing: {{ $('Character Agent').item.json.output[1].Clothing }}
Color Scheme: {{ $('Character Agent').item.json.output[1].color_scheme }}

Character 3:
Name: {{ $('Character Agent').item.json.output[2].Name }}
Origin: {{ $('Character Agent').item.json.output[2].Origin }}
Clothing: {{ $('Character Agent').item.json.output[2].Clothing }}
Color Scheme: {{ $('Character Agent').item.json.output[2].color_scheme }}


Structured Output Parse - Final Prompt Agent
[
   {
     "textToImagePrompt": " "
   },
  {
    "textToImagePrompt": " "},
  {
"textToImagePrompt": " " 
  }
]

Next Row of Nodes - 

List Node
Use code:

const prompts = $input.first().json.output;

return prompts.map(p => ({
  json: {
    textToImagePrompt:
      p.textToImagePrompt.replace(/\n/g,  ' ')
  }
}));

Generate
***Expression Node***
This is where we ask the modeling api to generate the image based on the code we outline.
Model is the api placement (in this we used chatgpt - this is to be changed when we flip out another one for this. We need to see what the code looks like for gemini to see if this can be changed out to move forward.

Use this code
{
  "model": "gpt-image-1",
  "prompt": "generate a high-quality images with this prompt: {{ $json.textToImagePrompt }}",
  "size": "1024x1536",
  "quality": "high",
  "moderation": "low",
  "output_formation": "jpeg",
  "background": "opaque",
  "output_compression": 50
}

OPTION 2 from ChatGPT because these codes don’t work anymore due to the update:

{{ { "model": "gpt-image-1", "prompt": "generate a high-quality images with this prompt: " + $json.textToImagePrompt, "size": "1024x1536", "quality": "high", "moderation": "low", "output_formation": "jpeg", "background": "opaque", "output_compression": 50 } }}



When we are ready to create the image url for Blotato we created the node and then use the following 
Use the http node.
Method is Post

Data is 
Url
https://api.imgur.com/3/image


Under Create URL for images
Toggle ON Both under FIXED:
Send Headers
Name: Authorization
Value: Client-ID 3fbeca5f8d85b21 (api key created 
Send Body

Blotato Upload
https://backend.blotato.com/vw/media 

API Key for this project: 

ChatGPT:
[secret value withheld]


Ingur API kep for this project:

Client ID:
3fbeca5f8d85b21

Client Secret:
8b58184dfb5664207e0c4e5448f06aad013d290e
