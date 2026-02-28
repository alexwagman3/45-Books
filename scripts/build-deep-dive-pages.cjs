'use strict';

/**
 * build-deep-dive-pages.cjs
 * Generates the three shelf-level deep dive pages:
 *   src/pages/love-your-neighbors-deep-dive.astro  (9 sections)
 *   src/pages/disciple-deep-dive.astro              (1 section)
 *   src/pages/feed-your-body-deep-dive.astro        (1 section)
 *
 * Also copies texts content to src/data/texts-content.txt
 * for build-time import.
 */

const fs   = require('fs');
const path = require('path');

const PROJECT   = path.join(__dirname, '..');
const PAGES_DIR = path.join(PROJECT, 'src/pages');
const DATA_DIR  = path.join(PROJECT, 'src/data');

fs.mkdirSync(DATA_DIR, { recursive: true });

// ─── Transform onclick scroll handlers → plain href anchors ─────────────────
// Original: onclick="var el=document.getElementById(\'dd-xxx\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})"
// New:      href="#dd-xxx"
function fixOnclicks(html) {
  return html.replace(
    /onclick="var el=document\.getElementById\(\\?'([^'\\]+)\\?'\);[^"]+"/g,
    'href="#$1"'
  );
}

// ─── Copy texts content ────────────────────────────────────────────────────
const TEXTS_SRC  = path.join(PROJECT, 'extracted_texts.txt');
const TEXTS_DEST = path.join(DATA_DIR, 'texts-content.txt');
if (fs.existsSync(TEXTS_SRC)) {
  fs.copyFileSync(TEXTS_SRC, TEXTS_DEST);
  console.log('✓ Copied extracted_texts.txt → src/data/texts-content.txt');
}

// ─── Section HTML content ───────────────────────────────────────────────────
// Each string is the raw inner HTML returned by the getter functions,
// extracted from the source HTML file. onclicks are transformed to hrefs.

const HTML = {};

HTML.disciplechange = fixOnclicks(`<span class="takeaways-tag">Disciple</span>
<h1 class="takeaways-title">How to Help Someone Change</h1>

<div class="dd-category" id="dd-change-framework"><div class="dd-category-title">Framework</div>
<div class="dd-item-label">Love</div>
<div class="dd-item">Treat others the way you want to be treated. Lead with patience and kindness while resisting contempt, defensiveness, rudeness, and resentment.</div>
<div class="dd-item-label">Know</div>
<div class="dd-item">Take interest in their inner world. Ask better questions, listen for fears and desires beneath behavior, and follow up so trust is proven over time.</div>
<div class="dd-item-label">Speak</div>
<div class="dd-item">Balance empathy with logic. Use story, metaphor, and reframing to help them see reality clearly, and apply gospel truth to their exact situation.</div>
<div class="dd-item-label">Do</div>
<div class="dd-item">Lower friction to action. Ask for one small next step, clarify timing, and keep momentum through loving accountability.</div>
<div class="dd-item-label">Heart-Level Reminder</div>
<div class="dd-item">People rarely think clearly in distress. Questions help them remember what is true when emotion is loud. It is a grace to come alongside someone and help them remember what they most need to remember.</div>
</div>`);

HTML.difficult = fixOnclicks(`<span class="takeaways-tag">Love Your Neighbors</span>
<h1 class="takeaways-title">Dealing with Difficult People</h1>
<p style="font-size:.9rem;color:#7A7368;font-style:italic;margin-bottom:2.5rem;font-family:'EB Garamond',serif">De-escalation phrases, correction techniques, and conflict frameworks</p>
<div class="dd-topic-list"><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-the-magic-de-escalators\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">The Magic De-Escalators</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-giving-correction-without-offense\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Giving Correction Without Offense</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-initiating-healthy-conflict\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Initiating Healthy Conflict</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-appealing-to-nobler-motives\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Appealing to Nobler Motives</a></div>

<div class="dd-category" id="dd-the-magic-de-escalators"><div class="dd-category-title">The Magic De-Escalators</div>
<div class="dd-item-label">The Ultimate Empathy Phrase</div>
<div class="dd-item">&quot;I don&#x27;t blame you one iota for feeling as you do. If I were you I would undoubtedly feel just as you do.&quot;</div>
<div class="dd-item-label">The Humble Inquiry</div>
<div class="dd-item">&quot;I may be wrong. I frequently am. And if I am right, I want to be corrected.&quot;</div>
<div class="dd-item-label">The &#x27;Drop of Honey&#x27;</div>
<div class="dd-item">&quot;I have respected the fact that you are always willing to listen and are big enough to change your mind when the facts warrant a change.&quot;</div>
<div class="dd-item-label">Agree Quickly</div>
<div class="dd-item">&quot;Agree with thine adversary quickly.&quot;</div>
</div>
<div class="dd-category" id="dd-giving-correction-without-offense"><div class="dd-category-title">Giving Correction Without Offense</div>
<div class="dd-item-label">The &#x27;And&#x27; Method (Sandwich)</div>
<div class="dd-item">Instead of using &#x27;but,&#x27; use &#x27;and.&#x27; Example: &quot;We&#x27;re really proud of you for raising your grades this term, and by continuing the same conscientious efforts next term, your algebra grade can be up with all the others.&quot;</div>
<div class="dd-item-label">Admitting Your Own Faults First</div>
<div class="dd-item">&quot;You have made a mistake, but the Lord knows, it&#x27;s no worse than many I have made. I have been guilty of so many stupid, silly things myself...&quot;</div>
<div class="dd-item-label">Asking Questions Instead of Orders</div>
<div class="dd-item">&quot;Do you think that would work?&quot; or &quot;Maybe if we were to phrase it this way it would be better?&quot;</div>
<div class="dd-item-label">Indirect Correction</div>
<div class="dd-item">Praise the specific behavior you want to see repeated (e.g., praising a messy worker for the one time they cleaned up).</div>
<div class="dd-item-label">Making the Fault Seem Easy to Correct</div>
<div class="dd-item">&quot;There is nothing to bridge except memory and judgment... Bridge will be a cinch for you.&quot;</div>
</div>
<div class="dd-category" id="dd-initiating-healthy-conflict"><div class="dd-category-title">Initiating Healthy Conflict</div>
<div class="dd-item-label">The Soft Opener</div>
<div class="dd-item">&quot;I feel like things aren&#x27;t right between us. Is there anything we should talk through?&quot;</div>
<div class="dd-item-label">The Curiosity Approach</div>
<div class="dd-item">&quot;Assume the Best.&quot; Ask questions to understand their side rather than condemning.</div>
<div class="dd-item-label">The &#x27;Log in Eye&#x27; Check</div>
<div class="dd-item">Before accusing, ask: &quot;Am I putting unfair expectations on this person to meet my needs?&quot;</div>
<div class="dd-item-label">Seeking Reconciliation</div>
<div class="dd-item">&quot;Conflict is safe when you know you won&#x27;t quit each other.&quot;</div>
</div>
<div class="dd-category" id="dd-appealing-to-nobler-motives"><div class="dd-category-title">Appealing to Nobler Motives</div>
<div class="dd-item-label">The Reputation Play</div>
<div class="dd-item">&quot;I sized you up in the first place as being a man of your word... I&#x27;m willing to take a gamble.&quot;</div>
<div class="dd-item-label">Giving a Fine Reputation to Live Up To</div>
<div class="dd-item">&quot;To show you I&#x27;m sure that you&#x27;ll never do this again, I want you to service my F-51 tomorrow.&quot;</div>
<div class="dd-item-label">The Challenge</div>
<div class="dd-item">&quot;It&#x27;ll take a big person to go up there and stay.&quot;</div>
<div class="dd-item-label">Saving Face</div>
<div class="dd-item">Let the other person save face; don&#x27;t just &quot;ram the unpalatable fact down our esophagus.&quot;</div>
</div>`);

HTML.loudlistening = fixOnclicks(`<span class="takeaways-tag">Love Your Neighbors</span>
<h1 class="takeaways-title">Loud Listening</h1>
<p style="font-size:.9rem;color:#7A7368;font-style:italic;margin-bottom:2.5rem;font-family:'EB Garamond',serif">Practical techniques for giving unmistakable attention</p>
<div class="dd-topic-list"><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-what-it-looks-like\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">What It Looks Like</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-what-it-means-to-them\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">What It Means to Them</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-quick-start-checklist\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Quick-Start Checklist</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-common-mistakes-to-avoid\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Common Mistakes to Avoid</a></div>

<div class="dd-category" id="dd-what-it-looks-like"><div class="dd-category-title">What It Looks Like</div>
<div class="dd-item">All-in presence: silence notifications, put phone facedown, swivel toward them, hold the gaze. Multitasking murders connection.</div>
<div class="dd-item">High-signal body language: lean in, nod every few beats, mirror their excitement or concern. Non-verbal cues carry most of the emotional freight.</div>
<div class="dd-item">Mini verbal check-ins: sprinkle &quot;uh-huh,&quot; &quot;seriously?&quot; or quick paraphrases (&quot;So the flight got canceled right at the gate?&quot;). These micro-bursts prove you&#x27;re tracking.</div>
<div class="dd-item">Follow-up curiosity: when their story pauses, toss a gentle &quot;And then what happened?&quot; or &quot;How did that make you feel?&quot; to keep the narrative flowing.</div>
<div class="dd-item">Reflect a specific detail back to them - not a summary, but one vivid thing they said, which proves you were actually listening.</div>
<div class="dd-item">Seal it with a recap: &quot;Okay, so the plan is brunch at 10 and you&#x27;ll text if plans change-got it!&quot;</div>
</div>
<div class="dd-category" id="dd-what-it-means-to-them"><div class="dd-category-title">What It Means to Them</div>
<div class="dd-item">Feeling truly seen. Brain-imaging studies show that being on the receiving end of active listening lights up the reward circuitry and leaves people with warmer feelings toward the listener.</div>
<div class="dd-item">Faster emotional relief. When someone meets you with big, visible empathy, stress levels drop and they process their own story more clearly.</div>
<div class="dd-item">Deeper trust and closeness. Consistent loud listening cues build the &quot;you get me&quot; bond that turns casual friends into confidants.</div>
</div>
<div class="dd-category" id="dd-quick-start-checklist"><div class="dd-category-title">Quick-Start Checklist</div>
<div class="dd-item">1. Park distractions - phone on silent, face down.</div>
<div class="dd-item">2. Show &amp; tell - nod + a one-word affirmation every 10 seconds or so.</div>
<div class="dd-item">3. Reflect a detail - &quot;So your boss actually said that?&quot;</div>
<div class="dd-item">4. Invite more - &quot;What happened next?&quot;</div>
<div class="dd-item">5. Seal it with a recap - &quot;Okay, so the plan is brunch at 10 and you&#x27;ll text if plans change-got it!&quot;</div>
</div>
<div class="dd-category" id="dd-common-mistakes-to-avoid"><div class="dd-category-title">Common Mistakes to Avoid</div>
<div class="dd-item">Half-scrolling your phone while they talk. Even a glance at a notification kills the &quot;you get me&quot; bond.</div>
<div class="dd-item">Jumping to solutions before they&#x27;ve finished venting. Sometimes people just need to be heard, not fixed.</div>
<div class="dd-item">One-upping their story. &quot;Oh that happened to me too, but worse...&quot; makes them feel unseen, not understood.</div>
<div class="dd-item">Waiting for your turn to talk instead of actually absorbing what they&#x27;re saying.</div>
<div class="dd-item">Offering platitudes instead of presence. &quot;Everything happens for a reason&quot; isn&#x27;t listening - it&#x27;s deflecting.</div>
<div class="dd-item">Finishing their sentences. Let the pauses breathe. Silence isn&#x27;t awkward-it&#x27;s where vulnerability lives.</div>
</div>`);

HTML.acts = fixOnclicks(`<span class="takeaways-tag">Love Your Neighbors</span>
<h1 class="takeaways-title">Acts of Service: How I Show Up</h1>
<p style="font-size:.9rem;color:#7A7368;font-style:italic;margin-bottom:2.5rem;font-family:'EB Garamond',serif">Over 90 specific ways to serve the people around you</p>
<div class="dd-topic-list"><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-when-to-call\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">When to Call</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-when-to-text\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">When to Text</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-when-to-follow-up\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">When to Follow Up</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-practical-ways-to-serve\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Practical Ways to Serve</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-ways-to-get-someone-to-accept-help\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Ways to Get Someone to Accept Help</a></div>

<div class="dd-category" id="dd-when-to-call"><div class="dd-category-title">When to Call</div>
<div class="dd-item">Call them on their birthday (especially milestone birthdays)</div>
<div class="dd-item">Call them after job interviews</div>
<div class="dd-item">Call them when they get promoted</div>
<div class="dd-item">Call them after they close on a house</div>
<div class="dd-item">Call them when they are recently pregnant</div>
<div class="dd-item">Call them when they are recently engaged</div>
<div class="dd-item">Call them when you know they&#x27;re going through stressful situations (Rahe stress scale)</div>
<div class="dd-item">Call them the day that their kids start daycare or school</div>
<div class="dd-item">Call them when they recently earned an award or received honors</div>
<div class="dd-item">Call someone on Father&#x27;s Day/Mother&#x27;s Day who recently lost a parent</div>
</div>
<div class="dd-category" id="dd-when-to-text"><div class="dd-category-title">When to Text</div>
<div class="dd-item">Text them on their baby delivery due date</div>
<div class="dd-item">Text them the day before their wedding anniversary</div>
<div class="dd-item">Text someone on their deceased loved one&#x27;s birthday / death anniversary</div>
<div class="dd-item">Text them when they graduate, retire, or accomplished something that took a lot of effort</div>
<div class="dd-item">Text them when they hit or miss their sales quota</div>
<div class="dd-item">Text them after they recently got back from a big family vacation</div>
<div class="dd-item">Send them a text asking for more details about their latest social media post</div>
</div>
<div class="dd-category" id="dd-when-to-follow-up"><div class="dd-category-title">When to Follow Up</div>
<div class="dd-item">Follow up one week and one month after they are in conflict with loved ones or going through divorce</div>
<div class="dd-item">Follow up one week and one month after they recently lost a loved one</div>
<div class="dd-item">Follow up one week and one month after they got fired or started a new job</div>
<div class="dd-item">Follow up one week and one month after they recently moved to a new city</div>
</div>
<div class="dd-category" id="dd-practical-ways-to-serve"><div class="dd-category-title">Practical Ways to Serve</div>
<div class="dd-item">When friends or family leave on vacation, offer to water their plants, pet-sit, mow their lawn, watch their kids, or check in on their house</div>
<div class="dd-item">Support their goals actively by promoting their business, recommending their services, or connecting them with opportunities</div>
<div class="dd-item">Participate in their cultural celebrations and traditions with genuine enthusiasm</div>
<div class="dd-item">Mow an elderly neighbor&#x27;s lawn without being asked</div>
<div class="dd-item">Be interruptible and give up what you were planning on doing to help someone who clearly needs it more</div>
<div class="dd-item">Respond meaningfully to their social media with genuine comments rather than just likes</div>
<div class="dd-item">Send voice messages occasionally for a more personal touch than text</div>
<div class="dd-item">When someone is busy at work, rather than asking &#x27;how can I help?&#x27; ask &#x27;what activity were you planning on doing next?&#x27; and then do it for them</div>
<div class="dd-item">Drop off dog toys at someone&#x27;s house when they get a new puppy</div>
<div class="dd-item">Drop off soup and a get-well note at someone&#x27;s house when they are sick</div>
<div class="dd-item">Offer to buy supplies for a teacher&#x27;s classroom</div>
<div class="dd-item">Invite someone who&#x27;s alone to join your family celebrations</div>
<div class="dd-item">Look for books, articles, information, and opportunities to help people when they are going through a tough time</div>
<div class="dd-item">Listen for struggles and find ways to lift up, support, and encourage</div>
<div class="dd-item">Drop off pizza and plates unannounced to someone who barely has enough time to eat</div>
<div class="dd-item">Show up to support events important to others (recitals, games, graduations)</div>
<div class="dd-item">Find a way to naturally ask someone what their favorite thing about someone nearby is and make sure they overhear it</div>
<div class="dd-item">Toast their small win at group dinner</div>
<div class="dd-item">Help a friend put together a resume to find a job</div>
<div class="dd-item">Include kids with special needs in activities with your children</div>
<div class="dd-item">Offer to help someone with their home project</div>
<div class="dd-item">Spend time with someone who is lonely. Ask lots of questions and let them do most of the talking</div>
<div class="dd-item">When someone mentions traveling, offer to pick them up or drop them off at the airport</div>
<div class="dd-item">Do something special for their special someone</div>
<div class="dd-item">When someone hosts a gathering, show up early to help cook and stay late to clean up</div>
<div class="dd-item">Open up and be vulnerable/dependent. Openly acknowledge that you need your friends</div>
<div class="dd-item">Take family photos for someone who can&#x27;t afford a photographer</div>
<div class="dd-item">Share an article or book that made you think of someone specifically</div>
<div class="dd-item">Defend someone from gossip who isn&#x27;t present to defend themselves</div>
<div class="dd-item">Give positive feedback to someone at work and send it to their boss or internal feedback system</div>
<div class="dd-item">Look for the people who no-showed or weren&#x27;t able to make a certain event and tell them they were missed</div>
<div class="dd-item">Offer to babysit for free for tired or busy parents</div>
<div class="dd-item">Ask them directly how you can best be there for someone during their tough time</div>
<div class="dd-item">Let someone in need borrow your tools, truck, or time</div>
<div class="dd-item">Help someone who is battling substance abuse</div>
<div class="dd-item">Rent tools from Home Depot (power washer, paint sprayer, carpet cleaner) and offer to serve friends by helping them take care of their home</div>
<div class="dd-item">Ask someone if there are any foundations or causes they are passionate about and make a donation in their name</div>
<div class="dd-item">Send &#x27;Thank You&#x27; notes to your client&#x27;s boss to help them get closer to a promotion</div>
<div class="dd-item">Send &#x27;Thank You&#x27; notes to the bride&#x27;s family after weddings</div>
<div class="dd-item">Drop off food for firemen and police officers</div>
<div class="dd-item">Show up to a friend&#x27;s house who is busy or struggling and tell them &#x27;put me to work!&#x27;</div>
<div class="dd-item">Identify a unique gift that someone carries, and express with rich clarity why that quality is important to you or to the world</div>
<div class="dd-item">Spend time with someone dealing with depression and just sit with them in their feelings</div>
<div class="dd-item">Go through your old books and find one you think this person would like. Write a note on the inside cover about why you&#x27;re passing it on</div>
<div class="dd-item">Intentionally give a compliment to someone who may not receive them often</div>
<div class="dd-item">Call or text someone&#x27;s family and give them a secondhand compliment through their spouse, sibling, parent, or best friend</div>
<div class="dd-item">Offer to help neighbors with tree-trimming, window-washing, car washing, or driveway power-washing once a year</div>
<div class="dd-item">Offer to shop for food and pick up medications for seniors and those who are sick</div>
<div class="dd-item">Offer support to those who serve special needs children</div>
<div class="dd-item">Follow up with big client deals or projects that are upcoming at work</div>
<div class="dd-item">Invite someone who may not have any plans over for Thanksgiving</div>
<div class="dd-item">Use every toast as an opportunity to compliment someone and make them feel important</div>
<div class="dd-item">Ask someone for a food recommendation, then secretly make a reservation to take them there in a month, comped by you</div>
<div class="dd-item">Drop off beers, cigars, or other small items at a friend&#x27;s house when something big happens in their life</div>
<div class="dd-item">Ask someone to church</div>
<div class="dd-item">Think of something someone does regularly with no expectation of credit and give them the credit they deserve</div>
<div class="dd-item">Encourage someone by sharing how God&#x27;s grace helped you in your weakness rather than bragging about your strength</div>
<div class="dd-item">Compliment the traits people spend their whole life honing</div>
<div class="dd-item">Visit someone in the hospital</div>
<div class="dd-item">Brag about someone when introducing them to someone else</div>
<div class="dd-item">When someone suffers a public disgrace, give them the gift of presence by taking them out to lunch every week for the next month</div>
<div class="dd-item">Offer your car or house to someone&#x27;s visiting family or friends</div>
<div class="dd-item">Challenge a friend or keep them accountable to something they are working on</div>
<div class="dd-item">Ask how you can pray for someone, and pray over them right then and there if they will let you</div>
<div class="dd-item">Pray continually for people through hard times, and let them know when you do</div>
<div class="dd-item">Be generous with your expertise</div>
<div class="dd-item">Write a handwritten thank-you note for someone who has recently helped you</div>
<div class="dd-item">Provide invisible support, like cleaning up the house without being asked</div>
<div class="dd-item">Call your parents/grandparents just to say hi and make sure they are doing well</div>
<div class="dd-item">Forgive someone who has wronged you</div>
<div class="dd-item">Bring up an old memory or photo that you share with someone and compliment them in the process</div>
<div class="dd-item">Offer free tutoring sessions for students struggling with their studies</div>
<div class="dd-item">Take note of how someone uniquely serves you and find a way to serve them that way in return</div>
<div class="dd-item">Create a digital group card to celebrate or come alongside someone during an important time</div>
<div class="dd-item">Set up a Meal Train for someone who could use it. Cook a week&#x27;s worth of meals for a family dealing with a big life event</div>
<div class="dd-item">Offer free language lessons to immigrants or refugees</div>
<div class="dd-item">Help with trash, dishes, lawn, laundry, countertops, sweeping, vacuuming, toilet cleaning for those who are mourning</div>
<div class="dd-item">When someone is hosting a big party: arrive early to set up, bring a dish/drinks/ice, play bartender, entertain kids, tidy as they go, act as photographer, run errands, assist in serving food, direct guest traffic, introduce guests to each other, handle the trash, or offer post-party cleanup</div>
</div>
<div class="dd-category" id="dd-ways-to-get-someone-to-accept-help"><div class="dd-category-title">Ways to Get Someone to Accept Help</div>
<div class="dd-item">The &quot;A or B&quot; Option: &quot;I have some free time this afternoon. Would you rather I take the kids to the park, or should I come over and tackle that pile of dishes?&quot;</div>
<div class="dd-item">The &quot;Selfish&quot; Reframing: &quot;I am incredibly bored right now and need a distraction. Can I please come over and help you organize that garage? It would honestly be a huge favor to me.&quot;</div>
<div class="dd-item">The &quot;Already in Motion&quot; Technique: &quot;I&#x27;m making a huge pot of chili and I made way too much. I&#x27;m going to drop a container on your porch around 6:00. You don&#x27;t even have to come to the door.&quot;</div>
<div class="dd-item">The &quot;Body Double&quot; Offer: &quot;I have a stack of paperwork I&#x27;ve been avoiding. Can I come over and do my admin work at your kitchen table while you do yours? I just focus better when someone else is working next to me.&quot;</div>
<div class="dd-item">The &quot;Expertise&quot; Excuse: &quot;I just learned this new formatting trick in Excel and I&#x27;ve been dying to test it. Can you send me that spreadsheet you&#x27;re stressing over?&quot;</div>
<div class="dd-item">The &quot;Statement,&quot; Not the Question: &quot;I&#x27;m picking up your kids from soccer practice today and bringing them home so you don&#x27;t have to worry about traffic. I&#x27;ll text you when we&#x27;re 5 minutes away.&quot;</div>
<div class="dd-item">The &quot;Future-Proof&quot; Setup: &quot;I know you&#x27;ve got this handled right now, but when you get to the painting stage of the renovation, will you promise to text me? I actually enjoy painting.&quot;</div>
</div>`);

HTML.fivefives = fixOnclicks(`<span class="takeaways-tag">Love Your Neighbors</span>
<h1 class="takeaways-title">The Five Fives</h1>
<p style="font-size:.9rem;color:#7A7368;font-style:italic;margin-bottom:2.5rem;font-family:'EB Garamond',serif">Five categories, five items each, all within five miles of home</p>
<div class="dd-topic-list"><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-5-friends\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">5 Friends</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-5-trails\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">5 Trails</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-5-dinners-to-host\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">5 Dinners to Host</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-5-conversation-starter-topics\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">5 Conversation Starter Topics</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-5-alternative-hangout-formats\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">5 Alternative Hangout Formats</a></div>

<div class="dd-category" id="dd-5-friends"><div class="dd-category-title">5 Friends</div>
<div class="dd-item">Friend Couple 1</div>
<div class="dd-item">Friend Couple 2</div>
<div class="dd-item">Friend Couple 3</div>
<div class="dd-item">Friend Couple 4</div>
<div class="dd-item">Friend Couple 5</div>
<div class="dd-item-label">Others</div>
<div class="dd-item">Additional neighbor families in our orbit</div>
</div>
<div class="dd-category" id="dd-5-trails"><div class="dd-category-title">5 Trails</div>
<div class="dd-item">Violet Crown / Circle C Park trails</div>
<div class="dd-item">Dick Nichols Park / Latta Branch</div>
<div class="dd-item">William Karst Preserve / Goat Cave</div>
<div class="dd-item">Sunset Valley Nature Area</div>
<div class="dd-item">Stephenson Nature Preserve</div>
</div>
<div class="dd-category" id="dd-5-dinners-to-host"><div class="dd-category-title">5 Dinners to Host</div>
<div class="dd-item">Crustless Chicken Pot Pie | Roasted Tomatoes &amp; Burrata w/ Crostini</div>
<div class="dd-item">Chicken Parmesan | Caprese Salad (Basil, tomato and mozzarella)</div>
<div class="dd-item">Chicken Caesar Bowtie Pasta Salad | Ribeye Steak Crostini</div>
<div class="dd-item">Green Chicken Chile Enchiladas | Mexican charcuterie w/ Black bean and corn salsa</div>
<div class="dd-item">Pulled Pork Nachos | Homemade guacamole w/ tortilla chips</div>
</div>
<div class="dd-category" id="dd-5-conversation-starter-topics"><div class="dd-category-title">5 Conversation Starter Topics</div>
<div class="dd-item-label">Reflection</div>
<div class="dd-item">How&#x27;s your week been? What&#x27;s been the &#x27;high&#x27; and &#x27;low&#x27; of your week so far?</div>
<div class="dd-item">What&#x27;s been going on in your life since the last time I saw you?</div>
<div class="dd-item">What&#x27;s been keeping you busy? Got anything new or exciting going on next week?</div>
<div class="dd-item-label">Relationships</div>
<div class="dd-item">How&#x27;re your kids/parents/siblings/grandparents doing?</div>
<div class="dd-item">How&#x27;re things with you and your husband/wife?</div>
<div class="dd-item">Have you gotten the chance to see any friends lately? Have you had any interesting conversations lately?</div>
<div class="dd-item-label">Occupation</div>
<div class="dd-item">What&#x27;s going on with work? Anything new happening around the office?</div>
<div class="dd-item">How are things with you and your boss? What have you been working on this week?</div>
<div class="dd-item">How&#x27;s the work/life balance?</div>
<div class="dd-item-label">Hobbies &amp; Leisure</div>
<div class="dd-item">Read any good books recently? Listened to any good podcasts recently?</div>
<div class="dd-item">Watched any good movies or shows recently? Tried any new restaurants or coffee shops lately?</div>
<div class="dd-item">How do you usually unwind after a busy week? How have you been spending your free time lately?</div>
<div class="dd-item">What&#x27;s been on your mind this week? What&#x27;s been taking up the most mental bandwidth for you lately?</div>
<div class="dd-item-label">Current Events</div>
<div class="dd-item">Did you hear about...? Have you been staying up to date with...? What&#x27;s your opinion about...?</div>
</div>
<div class="dd-category" id="dd-5-alternative-hangout-formats"><div class="dd-category-title">5 Alternative Hangout Formats</div>
<div class="dd-item">Gym Hang - work out together, low-pressure, built-in activity</div>
<div class="dd-item">Quick Meat-Up - fast casual lunch or dinner, no hosting required</div>
<div class="dd-item">Bottles &amp; Bonfires - backyard firepit, BYOB, no agenda</div>
<div class="dd-item">Kitchen Sync - cook a meal together at someone&#x27;s house</div>
<div class="dd-item">Walk and Talk - trail walk or neighborhood loop, movement + conversation</div>
</div>`);

HTML.gatherings = fixOnclicks(`<span class="takeaways-tag">Love Your Neighbors</span>
<h1 class="takeaways-title">Cul-de-Sac Gatherings</h1>
<p style="font-size:.9rem;color:#7A7368;font-style:italic;margin-bottom:2.5rem;font-family:'EB Garamond',serif">Event-themed gatherings, neighborhood initiatives, and natural excuses to connect</p>
<div class="dd-topic-list"><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-event-themed-gatherings\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Event-Themed Gatherings</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-tv-season-finale-watch-parties\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">TV Season Finale Watch Parties</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-neighborhood-initiatives\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Neighborhood Initiatives</a></div>

<div class="dd-category" id="dd-event-themed-gatherings"><div class="dd-category-title">Event-Themed Gatherings</div>
<div class="dd-item">Chinese New Year (Jan/Feb): Firework display, eat Chinese food, red envelope giveaways, Chinese lanterns.</div>
<div class="dd-item">Oscars Night (Feb): Red carpet dress-up, awards for best dressed, film trivia.</div>
<div class="dd-item">Daytona 500 (Feb): Model car racing contest, remote control car races, Daytona-themed snacks like pit stop sliders and checkered flag cookies.</div>
<div class="dd-item">Mardi Gras (Feb/Mar): Beads, masks, king cake, jazz music playlist.</div>
<div class="dd-item">St. Patrick&#x27;s Day Parade (Mar): Green-themed snacks, Irish music, pot of gold scavenger hunt.</div>
<div class="dd-item">March Madness (Mar/Apr): Friendly bracket competition, team-themed snacks, free-throw shooting contest.</div>
<div class="dd-item">Crawfish Boil (Mar/Apr): Crawfish boil with corn and potato, crawfish races, zydeco music playlist.</div>
<div class="dd-item">The Masters (Apr): Pitch and putt in the front yard, pimento cheese sandwiches, golf outfits, and Arnold Palmers.</div>
<div class="dd-item">Cinco de Mayo (May): Taco bar, pi&#xF1;ata, margaritas.</div>
<div class="dd-item">Kentucky Derby (May): Fancy hats contest, mint juleps, horse race betting, themed lawn games like horseshoes.</div>
<div class="dd-item">National BBQ Day (May): Grill-off challenge, classic yard games.</div>
<div class="dd-item">Memorial Day Parade (May): Decorate bikes and wagons with patriotic colors, hold a small parade, and host a BBQ.</div>
<div class="dd-item">National Doughnut Day (Jun): Free doughnuts and coffee.</div>
<div class="dd-item">Wimbledon Tennis (Jun/Jul): Strawberry and cream station, nearby couples tennis matches, dress in Wimbledon white.</div>
<div class="dd-item">World Series of Poker Night (Jun/Jul): Poker tournament with snacks and cigars, best poker face contest.</div>
<div class="dd-item">Nathan&#x27;s Hot Dog Eating Contest (Jul): Amateur hot dog eating contest, patriotic music.</div>
<div class="dd-item">Tour de France Bike Ride (Jul): Neighborhood bike race, French cheese and wine tastings, yellow jersey for winner.</div>
<div class="dd-item">National Ice Cream Day (Jul): DIY sundae bar, flavor invention contest, ice cream trivia.</div>
<div class="dd-item">Ovalla Olympics (Jul/Aug): Each household picks a country to represent in a series of backyard games. Opening ceremony with national anthems.</div>
<div class="dd-item">Oktoberfest (Sep/Oct): Beer tasting, pretzel making, lederhosen.</div>
<div class="dd-item">Pumpkin Carving Contest (Oct): Provide tools and pumpkins, award prizes for creativity, roast pumpkin seeds, and make pumpkin themed desserts or cocktails.</div>
<div class="dd-item">Halloween Party (Oct): Costumes, haunted house setup, spooky games.</div>
<div class="dd-item">World Series Game (Oct/Nov): Backyard wiffleball, hot dogs and nachos, baseball music like &#x27;Take Me Out to the Ball Game.&#x27;</div>
<div class="dd-item">Daylight Savings, Fall Back (Nov): Outdoor movie night to take advantage of the early dark hours.</div>
<div class="dd-item">Friendsgiving (Nov): Potluck, pies, games, and &#x27;what were you most thankful for this year&#x27; conversation starter.</div>
<div class="dd-item">FIFA World Cup (Nov/Dec, every four years): Soccer tournament, live match screening, face paint, soccer juggling contest.</div>
</div>
<div class="dd-category" id="dd-tv-season-finale-watch-parties"><div class="dd-category-title">TV Season Finale Watch Parties</div>
<div class="dd-item">The Bachelor / Bachelorette</div>
<div class="dd-item">Survivor</div>
<div class="dd-item">Love Island</div>
<div class="dd-item">The White Lotus</div>
<div class="dd-item">Severance</div>
<div class="dd-item">Ted Lasso</div>
</div>
<div class="dd-category" id="dd-neighborhood-initiatives"><div class="dd-category-title">Neighborhood Initiatives</div>
<div class="dd-item">Parent&#x27;s Night Out: Arrange babysitting, have a parents&#x27; social night.</div>
<div class="dd-item">Community Bike Rides: Organize rides for various skill levels, explore local trails.</div>
<div class="dd-item">Neighborhood Newsletter or Blog: Share local news, events, stories; monthly spotlight on a specific neighbor.</div>
<div class="dd-item">Community Picnic: Picnic in the park with games, food sharing, and outdoor fun.</div>
<div class="dd-item">Supper Stroll / Cul-de-Sac Crawl: Rotate houses for different meal courses; share favorite dishes.</div>
<div class="dd-item">Outdoor Movie Night: Set up a screen, projector; bring chairs, blankets, popcorn, snacks.</div>
<div class="dd-item">Game Nights: Host board game or video game tournaments; prizes for winners. Bunko / Spades / Mahjong.</div>
<div class="dd-item">Poker Night for Guys: Cigars, poker, whiskey, Texas hold &#x27;em. Glow in the dark golf.</div>
<div class="dd-item">Digital Book Swap Club: Exchange books within the neighborhood, discuss recent reads, encourage reading among kids.</div>
<div class="dd-item">Pickleball in the Cul-de-Sac: Couples tournament with drinks and chairs around the cul-de-sac.</div>
<div class="dd-item">Driving Range and Dinner at the Club: Golf outing with dads, moms, and kids.</div>
<div class="dd-item">Wine Night: Blind taste test, international wines of the world, food pairings.</div>
</div>`);

HTML.gifts = fixOnclicks(`<span class="takeaways-tag">Love Your Neighbors</span>
<h1 class="takeaways-title">The Art of Giving Gifts</h1>
<p style="font-size:.9rem;color:#7A7368;font-style:italic;margin-bottom:2.5rem;font-family:'EB Garamond',serif">Principles, prompts, and specific ideas for every occasion</p>
<div class="dd-topic-list"><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-gift-giving-principles\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Gift-Giving Principles</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-chatgpt-prompt-for-gift-giving\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">ChatGPT Prompt for Gift-Giving</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-situation-specific-gift-ideas\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Situation-Specific Gift Ideas</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-local-care-package-for-someone-who-moved-out-of-state\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Local Care Package</a><a class="dd-topic-link" onclick="var el=document.getElementById(\'dd-universal-gift-ideas\');var c=document.getElementById(\'deepDiveOverlay\');c.scrollTo({top:el.offsetTop-60,behavior:\'smooth\'})">Universal Gift Ideas</a></div>

<div class="dd-category" id="dd-gift-giving-principles"><div class="dd-category-title">Gift-Giving Principles</div>
<div class="dd-item">Focus on something useful, not flashy. Observe what&#x27;s needed and give something that solves a problem they&#x27;re dealing with.</div>
<div class="dd-item">Gift things that can be used or consumed, like food, alcohol, or a get-well care package.</div>
<div class="dd-item">Skip the pricey gifts. Turn the gift-wrapping paper into a sweet note. Give meaningfully and thoughtfully-i.e. a local care package to a friend who&#x27;s moved away.</div>
<div class="dd-item">Prioritize experiences over things. Organizing a get-together for someone else can be a memorable gift itself.</div>
<div class="dd-item">Give the gift of a lasting memory: an unforgettable trip, a cooking class, concert tickets.</div>
<div class="dd-item">Give when it&#x27;s least expected. Send a book or a paid-for dinner spontaneously &#x27;just because.&#x27; Send flowers and a heartfelt note to someone going through a difficult time.</div>
<div class="dd-item">Give gifts that are explicitly asked for or wanted. Ask someone who knows them what they&#x27;ve had their eye on. Pay attention to the things they buy for themselves.</div>
</div>
<div class="dd-category" id="dd-chatgpt-prompt-for-gift-giving"><div class="dd-category-title">ChatGPT Prompt for Gift-Giving</div>
<div class="dd-item">&quot;I am looking for a gift for my ____ for ____. Ask me several questions to help me determine what might be the best gift to give? After I answer those questions, please come up with several specific ideas or products for me to consider. Please use the gift-giving principles listed below.&quot; [paste principles above]</div>
</div>
<div class="dd-category" id="dd-situation-specific-gift-ideas"><div class="dd-category-title">Situation-Specific Gift Ideas</div>
<div class="dd-item">Loss of Job: Second Mountain book, You Are a Badass book, a Starbucks gift card, and a handwritten note.</div>
<div class="dd-item">Someone Who Lost a Spouse or Child: A memory book filled with photos, anecdotes, and memories.</div>
<div class="dd-item">Retirement: A gift certificate for a fun class or workshop.</div>
<div class="dd-item">Change in Health of Family Member: Setting up a meal-train or preparing a home-cooked meal.</div>
<div class="dd-item">New Home: Toolset or Home Depot gift card. Kitchen gadgets. Cleaning-bucket starter kit. Robot vacuum/mop duo. Custom doormat with family name. Monogrammed throw blanket.</div>
<div class="dd-item">Outstanding Personal Achievement: A thoughtful card and a nice bottle of champagne.</div>
<div class="dd-item">Pregnancy: Maternity clothing subscription box, basket of spicy foods, &#x27;due DATES&#x27; (the fruit), pregnancy massage.</div>
<div class="dd-item">Before Delivery of 2nd+ Child: Send an at-home service to wash and detail their car for the arrival of their next kid.</div>
<div class="dd-item">Cocktail Call-Ahead: Find out where and when someone has dinner reservations, and call the restaurant ahead of time to send a bottle or first cocktail to their table.</div>
<div class="dd-item">New Parents: Gift of babysitting. Baby&#x27;s breath flowers with a clever note.</div>
<div class="dd-item">Change in Eating Habits: A cookbook focused on their new diet or a meal delivery subscription.</div>
<div class="dd-item">Christmas Approaching: A collection of holiday-themed treats or a hot cocoa set.</div>
<div class="dd-item">Birthday: Happy BDay donuts from Bougie&#x27;s Donuts or Wow Donuts. A gift that brings everyone closer-four tickets to an event, gift card for the gun range, game of golf for two, dance lessons.</div>
<div class="dd-item">Student Studying for Exams: A study care package with healthy snacks, herbal teas, and motivational notes.</div>
<div class="dd-item">Surgery: Task Rabbit or maid service or babysitting vouchers for extra hands.</div>
<div class="dd-item">Third Trimester: &#x27;Due Dates&#x27; (the fruit) with a note: &#x27;Legend has it that dates help encourage babies to make their grand entrance. These might be the only dates you have time for in the next few months!&#x27;</div>
</div>
<div class="dd-category" id="dd-local-care-package-for-someone-who-moved-out-of-state"><div class="dd-category-title">Local Care Package (for someone who moved out of state)</div>
<div class="dd-item">Texas Care Package: Salt Lick seasoning, Rudy&#x27;s/Stubbs/Franklins BBQ sauce, Cabo Bob&#x27;s hot sauce, Mateo&#x27;s salsa, Habanero jam, Texas tea recipe with small liquor bottles (Casamigos tequila, Tito&#x27;s vodka, Texas whiskey, gin, simple syrup, lemon juice, coke), Old El Paso taco seasoning, summer sausage with crackers and cheese, Kerbey Lane pancake mix, Shiner beer, Texas Independent beer, Hayley&#x27;s cookies, Texas Two Step popcorn.</div>
</div>
<div class="dd-category" id="dd-universal-gift-ideas"><div class="dd-category-title">Universal Gift Ideas</div>
<div class="dd-item">Case of beer with a thoughtful note</div>
<div class="dd-item">Pint of Ben &amp; Jerry&#x27;s</div>
<div class="dd-item">Ticketmaster or SeatGeek or Eventbrite gift card</div>
<div class="dd-item">Spa gift card</div>
<div class="dd-item">Custom calendar using photos and Gen AI</div>
<div class="dd-item">Visa Debit Card or gift card to their favorite store</div>
<div class="dd-item">Goldbelly order / Omaha Steaks</div>
<div class="dd-item">Engraved liquor bottles or customized liquor gift basket</div>
<div class="dd-item">Food gift basket</div>
<div class="dd-item">New dog gifts + Cuddle Clone Stuffed Animals</div>
<div class="dd-item">Sculpted cakes / Custom cakes</div>
<div class="dd-item">Cameos</div>
<div class="dd-item">New Baby: Custom-made baby blanket embroidered with baby&#x27;s name and birth date</div>
<div class="dd-item">Starbucks via SMS: &#x27;Sending you some Starbucks love to brighten your day and power you through the next Zoom meeting.&#x27;</div>
<div class="dd-item">Buy gift cards to their favorite stores. If you don&#x27;t know their favorite store, review their social media or think about what they do for fun.</div>
<div class="dd-item">Etsy for Christmas and birthdays. Text Georgia, Kate, and Emily for stocking stuffer ideas for Sami each year.</div>
</div>`);

// ─── Write love-your-neighbors-deep-dive.astro ──────────────────────────────
// Questions HTML is long — we read it directly from the extracted file

// Build the COMPLIMENTS section HTML inline (too long to parse from file cleanly)
const HTML_COMPLIMENTS = fixOnclicks(`<span class="takeaways-tag">Love Your Neighbors</span>
<h1 class="takeaways-title">The Art of Giving Better Compliments</h1>
<p style="font-size:.9rem;color:#7A7368;font-style:italic;margin-bottom:2.5rem;font-family:'EB Garamond',serif">A library of specific, sincere compliments organized by category — inspired by Carnegie's principles</p>
<div class="dd-topic-list"><a class="dd-topic-link" href="#dd-friendship-relationship">Friendship &amp; Relationship</a><a class="dd-topic-link" href="#dd-kindness-empathy">Kindness &amp; Empathy</a><a class="dd-topic-link" href="#dd-work-ethic-leadership">Work Ethic &amp; Leadership</a><a class="dd-topic-link" href="#dd-intelligence-wisdom">Intelligence &amp; Wisdom</a><a class="dd-topic-link" href="#dd-creativity-talents">Creativity &amp; Talents</a><a class="dd-topic-link" href="#dd-confidence-strength">Confidence &amp; Strength</a><a class="dd-topic-link" href="#dd-charisma-social-skills">Charisma &amp; Social Skills</a><a class="dd-topic-link" href="#dd-humor-fun-loving-nature">Humor &amp; Fun-Loving Nature</a><a class="dd-topic-link" href="#dd-appearance-style">Appearance &amp; Style</a><a class="dd-topic-link" href="#dd-parenting-family">Parenting &amp; Family</a><a class="dd-topic-link" href="#dd-values-faith">Values &amp; Faith</a><a class="dd-topic-link" href="#dd-taste-cultural-picks">Taste &amp; Cultural Picks</a><a class="dd-topic-link" href="#dd-patience-perseverance">Patience &amp; Perseverance</a><a class="dd-topic-link" href="#dd-adaptability-problem-solving">Adaptability &amp; Problem-Solving</a><a class="dd-topic-link" href="#dd-miscellaneous">Miscellaneous</a><a class="dd-topic-link" href="#dd-strategies-to-give-more-better-compliments">Strategies to Give More &amp; Better Compliments</a></div>

<div class="dd-category" id="dd-friendship-relationship"><div class="dd-category-title">Friendship &amp; Relationship</div>
<div class="dd-item">I thank God for our lifelong friendship.</div>
<div class="dd-item">I&#x27;m proud to call you my friend and I&#x27;m proud you call me your friend.</div>
<div class="dd-item">Your influence and impact on my life runs deeper than I&#x27;m even able to see clearly-but I&#x27;m absolutely certain it&#x27;s deeper than you&#x27;ve ever imagined.</div>
<div class="dd-item">Sami and I both really look up to you two!</div>
<div class="dd-item">You&#x27;re basically my second brother.</div>
<div class="dd-item">You have some fantastic advice on the serious stuff, but you&#x27;re even better at poking fun with the non-serious stuff</div>
<div class="dd-item">You&#x27;re the shoulder-to-cry-on throughout our family.</div>
<div class="dd-item">You&#x27;re the glue that holds this friend-group together and the bridge that connects it across distances too. You are good at being the &quot;glue&quot; of any new group you are in.</div>
<div class="dd-item">You&#x27;re an awesome friend, and I don&#x27;t tell you that enough.</div>
<div class="dd-item">You bring out the best out of everyone in the friend group.</div>
<div class="dd-item">Your friends are so lucky to have you.</div>
<div class="dd-item">The way we connect isn&#x27;t exactly normal compared to most friendships, yet I wouldn&#x27;t trade it for anything</div>
<div class="dd-item">You&#x27;re one of the few people who listen just to understand, not just to reply.</div>
<div class="dd-item">You&#x27;re the person that everyone wants on their team or in their friend group.</div>
<div class="dd-item">I was just telling someone the other day how kind you are.</div>
<div class="dd-item">You notice people&#x27;s needs before they&#x27;ve voiced them-it&#x27;s like you have interpersonal radar.</div>
<div class="dd-item">Being around you is so effortless.</div>
<div class="dd-item">Your strength, wisdom, occasional stubbornness, and unwavering love for me has shaped the person I am today.</div>
<div class="dd-item">The chance of meeting a person like you is the only reason I talk to strangers.</div>
<div class="dd-item">I learned how to be a good person by watching how you treat others.</div>
<div class="dd-item">You set such a good example for your kids.</div>
<div class="dd-item">I respect how you stick to your values even when it&#x27;s hard.</div>
<div class="dd-item">Anyone would be lucky to have you work for them!</div>
<div class="dd-item">What would we ever do without you?</div>
<div class="dd-item">You&#x27;re the reason things run smoothly around here.</div>
<div class="dd-item">You always have such interesting thoughts.</div>
</div>
<div class="dd-category" id="dd-kindness-empathy"><div class="dd-category-title">Kindness &amp; Empathy</div>
<div class="dd-item">You&#x27;re always the first to offer help or a listening ear when someone needs it.</div>
<div class="dd-item">You&#x27;re so kind everyone instantly feels like your friend.</div>
<div class="dd-item">You are love with a capital L.</div>
<div class="dd-item">I can tell, just by your kindness, that your faith matters a lot to you.</div>
<div class="dd-item">The way you live your values rather than just talking about them makes me want to be more authentic.</div>
<div class="dd-item">It&#x27;s really cool to see firsthand the way that you love and serve people.</div>
<div class="dd-item">You always make sure everyone in the room is heard-no one feels lonely or left out when you are around.</div>
<div class="dd-item">You&#x27;re like emotional infrastructure-quietly supporting everyone without demanding recognition.</div>
<div class="dd-item">Has anyone ever told you that you&#x27;re really great at actively listening and making someone feel heard?</div>
<div class="dd-item">You read emotional undercurrents in a room like others read billboard signs.</div>
<div class="dd-item">I appreciate how much you allow others to feel their feelings without judgment.</div>
<div class="dd-item">People walk away from conversations with you feeling more seen and understood.</div>
<div class="dd-item">You have a quiet strength about you that I truly admire. You handle challenges with such grace.</div>
<div class="dd-item">You don&#x27;t just hear people, you really feel what they&#x27;re going through.</div>
<div class="dd-item">Talking to you always puts me in a better mood.</div>
<div class="dd-item">You have the kind of hospitality that extends far beyond your four walls</div>
<div class="dd-item">Your generosity, kindness, and love for others is unmatched.</div>
<div class="dd-item">You are so organized, and it benefits everyone around you.</div>
<div class="dd-item">I was just telling someone the other day how kind you are.</div>
<div class="dd-item">You&#x27;re a really good person. There&#x27;s not a lot of people like you out there.</div>
</div>
<div class="dd-category" id="dd-work-ethic-leadership"><div class="dd-category-title">Work Ethic &amp; Leadership</div>
<div class="dd-item">I love working with people like you!</div>
<div class="dd-item">The work you put in deserves to be really applauded.</div>
<div class="dd-item">Anyone would be lucky to have you work for them!</div>
<div class="dd-item">Your hard work is going to take you far.</div>
<div class="dd-item">Your reliability is unmatched-when you promise to do something, I know I can count on you completely.</div>
<div class="dd-item">You take pride in everything you do, even the little tasks, and it makes a massive difference.</div>
<div class="dd-item">You impress me every single day with your ability to go the extra mile.</div>
<div class="dd-item">You deserve more recognition for everything you do.</div>
<div class="dd-item">I can tell that across our team, your words carry the most weight.</div>
<div class="dd-item">No matter what you do, you&#x27;re always putting 100% into it.</div>
<div class="dd-item">You embody grit and determination to a T.</div>
<div class="dd-item">I admire the high standards you set for yourself.</div>
<div class="dd-item">You&#x27;re undoubtedly one of the best people this organization has ever seen.</div>
<div class="dd-item">You&#x27;re proof that a tender heart and a spine of steel can totally coexist</div>
<div class="dd-item">Your resourcefulness is absolutely brilliant.</div>
<div class="dd-item">I like that you have a type B personality, but you get type A results.</div>
<div class="dd-item">The way you pursue growth makes learning look like an adventure rather than a chore.</div>
<div class="dd-item">I feel secure in your leadership and appreciate you taking charge, especially when things get tough.</div>
<div class="dd-item">You&#x27;re the reason things run smoothly around here.</div>
<div class="dd-item">What would we ever do without you?</div>
</div>
<div class="dd-category" id="dd-intelligence-wisdom"><div class="dd-category-title">Intelligence &amp; Wisdom</div>
<div class="dd-item">Your brain works in incredible ways.</div>
<div class="dd-item">Your perspective on life makes me want to live more thoughtfully.</div>
<div class="dd-item">I always learn so many interesting and thought-provoking things from you.</div>
<div class="dd-item">You have a knack for solving problems in creative ways that no one else would think of.</div>
<div class="dd-item">Whenever I&#x27;m in a bind, I just think, &quot;What would (so-and-so) do?&quot;</div>
<div class="dd-item">Wow, you really know your stuff!</div>
<div class="dd-item">When you listen, you&#x27;re so interested, and when you speak you&#x27;re so interesting!</div>
<div class="dd-item">Your mind connects dots that most people don&#x27;t even see exist.</div>
<div class="dd-item">The questions you ask make everyone around you think more deeply.</div>
<div class="dd-item">I love that I always learn something new when I talk to you.</div>
<div class="dd-item">I feel like you know something about everything.</div>
<div class="dd-item">I treasure your friendship and wisdom.</div>
<div class="dd-item">Your curiosity hasn&#x27;t aged a day since childhood, and it&#x27;s contagious.</div>
<div class="dd-item">You&#x27;re the thought-leader of our friend group.</div>
<div class="dd-item">Your way of thinking is so much different from other people&#x27;s, and it is refreshing.</div>
<div class="dd-item">I feel like I soak up information and wisdom just by being around you.</div>
<div class="dd-item">Whenever I&#x27;m not sure what to do, I know I can come to you for a wise perspective.</div>
<div class="dd-item">The wisdom you share has helped me so many times-you really have a gift for insight.</div>
<div class="dd-item">I always love how you teach me new things without ever making me feel silly for not knowing.</div>
<div class="dd-item">You have a knack for breaking down complex ideas in a way that just makes sense. Not everyone can teach like that.</div>
<div class="dd-item">You&#x27;re always learning and growing-it&#x27;s inspiring to see someone so dedicated to improvement.</div>
<div class="dd-item">You make learning look fun and easy.</div>
</div>
<div class="dd-category" id="dd-creativity-talents"><div class="dd-category-title">Creativity &amp; Talents</div>
<div class="dd-item">Your artwork belongs in a museum!</div>
<div class="dd-item">Your songs belong on a major world stage.</div>
<div class="dd-item">Anything she cooks is the best thing I&#x27;ve ever had!</div>
<div class="dd-item">The dinner you cooked for us was Food Network-worthy.</div>
<div class="dd-item">I&#x27;m obsessed with everything you cook.</div>
<div class="dd-item">Your ideas will change the world one day.</div>
<div class="dd-item">Your passion makes me wish I had the same passion.</div>
<div class="dd-item">If creativity was a sport, you&#x27;d be in the Olympics. And not just participating-you&#x27;d be bringing home the gold.</div>
<div class="dd-item">When you get famous, I want to be the president of your fan club.</div>
<div class="dd-item">Your songs / performances give me chills - you have so much talent. I could listen to you perform for hours.</div>
<div class="dd-item">I love how you decorated your house. It looks like it belongs on HGTV.</div>
<div class="dd-item">You host such amazing parties.</div>
<div class="dd-item">Geez, you make it all look so easy!</div>
<div class="dd-item">That ___ deserves a trophy or a spot in the Hall of Fame museum.</div>
<div class="dd-item">The way you reimagine possibilities makes me wonder what world you see that the rest of us are missing.</div>
</div>
<div class="dd-category" id="dd-confidence-strength"><div class="dd-category-title">Confidence &amp; Strength</div>
<div class="dd-item">You seem to really know who you are.</div>
<div class="dd-item">Is there anything you can&#x27;t do?</div>
<div class="dd-item">You display an incredibly balanced blend of confidence and humility.</div>
<div class="dd-item">How did you learn to be so good? I&#x27;ve never seen someone make something look so easy.</div>
<div class="dd-item">You&#x27;re a natural at whatever you do!</div>
<div class="dd-item">I love your confidence. Can you send some of it my way?</div>
<div class="dd-item">You&#x27;re one of the most authentic people I know, and I can tell that people around you appreciate it.</div>
<div class="dd-item">Every time I think you have done it all, you do something else outstanding.</div>
<div class="dd-item">I&#x27;ve never seen someone show more loyalty than you have. I&#x27;d want you on my side if I was going into battle.</div>
<div class="dd-item">You lead a life that others admire and aspire to.</div>
<div class="dd-item">You&#x27;re the kind of person that deserves the spotlight despite not wanting to be in it.</div>
<div class="dd-item">You&#x27;re a mountain of a man.</div>
</div>
<div class="dd-category" id="dd-charisma-social-skills"><div class="dd-category-title">Charisma &amp; Social Skills</div>
<div class="dd-item">You&#x27;re like a walking good mood playlist.</div>
<div class="dd-item">You seem happy today!</div>
<div class="dd-item">It&#x27;s so much fun being around you</div>
<div class="dd-item">You&#x27;re so easily lovable.</div>
<div class="dd-item">Has anyone ever told you that you have the best personality!?</div>
<div class="dd-item">I know we just met, but you seem like a really kind person. I&#x27;m sure you&#x27;ve heard this before, but you make a great first impression.</div>
<div class="dd-item">Your superpower is remembering the little details like birthdays, favorite snacks, and random stories from years ago, so people feel genuinely known.</div>
<div class="dd-item">You have the unique ability to make everyone feel like they&#x27;re your best friend.</div>
<div class="dd-item">The first time I met you, I thought you were amazing-and you&#x27;re even more amazing now.</div>
<div class="dd-item">Your sense of humor is like a secret weapon that disarms tension before it can take root.</div>
<div class="dd-item">I wish I knew more people like you.</div>
<div class="dd-item">I&#x27;m a little jealous of the way you make everyone feel at ease the moment you walk in.</div>
<div class="dd-item">You&#x27;re my constant reminder of just how clever some people can be.</div>
<div class="dd-item">[Prince Charming/Dale Carnegie] has nothing on you!</div>
<div class="dd-item">You ask the kind of questions that teach people more about themselves.</div>
<div class="dd-item">You bring out the best out of everyone in the friend group.</div>
<div class="dd-item">You have the ability to make people around you happy.</div>
<div class="dd-item">You light up every room you enter, and everyone can sense it.</div>
<div class="dd-item">If good vibes were currency, you&#x27;d be a billionaire. Thanks for keeping us all rich in positivity.</div>
<div class="dd-item">Being around you is like the warmth of a glass of wine combined with the energy of a Red Bull, without the hangover or the crash.</div>
<div class="dd-item">You&#x27;re the kind of person that deserves the spotlight despite not wanting to be in it.</div>
</div>
<div class="dd-category" id="dd-humor-fun-loving-nature"><div class="dd-category-title">Humor &amp; Fun-Loving Nature</div>
<div class="dd-item">You&#x27;re like a walking good mood playlist.</div>
<div class="dd-item">Being around you is like a happy little vacation.</div>
<div class="dd-item">You&#x27;re like a bottomless champagne flute filled with bubbles.</div>
<div class="dd-item">It&#x27;s so easy to have a good time around you!</div>
<div class="dd-item">Every time we hang out, I just feel better.</div>
<div class="dd-item">You embrace your silliness unapologetically, which makes everything 10x more fun.</div>
<div class="dd-item">Hanging out with you is like taking the perfect dose of both Adderall and Zoloft, where neither of the effects counteracts the other.</div>
<div class="dd-item">Your enthusiasm for adventure is contagious.</div>
<div class="dd-item">I love how you find the funny side of things without ever being mean.</div>
<div class="dd-item">Your sense of humor is like a secret weapon that disarms tension before it can take root.</div>
</div>
<div class="dd-category" id="dd-appearance-style"><div class="dd-category-title">Appearance &amp; Style</div>
<div class="dd-item">You can&#x27;t take a bad photo. Can you?</div>
<div class="dd-item">Your hairstyle frames your face perfectly.</div>
<div class="dd-item">You always have such a cool style-every outfit you wear looks like it was made for you.</div>
<div class="dd-item">You&#x27;re astonishingly gorgeous and that&#x27;s the least interesting thing about you.</div>
<div class="dd-item">Hey! It&#x27;s nice to see a smile on your face!</div>
</div>
<div class="dd-category" id="dd-parenting-family"><div class="dd-category-title">Parenting &amp; Family</div>
<div class="dd-item">You set such a good example for your kids.</div>
<div class="dd-item">You deserve the &#x27;dad of the decade&#x27; award / You deserve the &quot;Ultimate Role Model&quot; award.</div>
<div class="dd-item">You&#x27;re an all-star mom, a well-deserving wife, a hard-working employee, and a heroic daughter. I have no idea how you manage to be everything to everyone all at once, but it&#x27;s inspiring to watch.</div>
<div class="dd-item">Your mother did a good job raising you.</div>
<div class="dd-item">I hope my daughter grows up to be like you.</div>
<div class="dd-item">You&#x27;re an amazing model of grace and strength.</div>
</div>
<div class="dd-category" id="dd-values-faith"><div class="dd-category-title">Values &amp; Faith</div>
<div class="dd-item">I thank God for our lifelong friendship.</div>
<div class="dd-item">You&#x27;re just an all-around top-shelf human being.</div>
<div class="dd-item">I can tell, just by your kindness, that your faith matters a lot to you.</div>
<div class="dd-item">Your strength, wisdom, occasional stubbornness, and unwavering love for me has shaped the person I am today.</div>
<div class="dd-item">You give life to the saying &quot;actions speak louder than words.&quot;</div>
<div class="dd-item">You are a wonderful listener. I always feel understood/valued by you.</div>
</div>
<div class="dd-category" id="dd-taste-cultural-picks"><div class="dd-category-title">Taste &amp; Cultural Picks</div>
<div class="dd-item">You always have such great taste in music-every playlist you share becomes my new favorite.</div>
<div class="dd-item">I trust your taste completely. Whether it&#x27;s choosing a restaurant or a gift, you always pick the perfect thing.</div>
<div class="dd-item">You&#x27;ve got an eye for quality. Your taste in books and movies is impeccable; I always love your suggestions.</div>
</div>
<div class="dd-category" id="dd-patience-perseverance"><div class="dd-category-title">Patience &amp; Perseverance</div>
<div class="dd-item">Your patience is incredible-you never rush others and always give them the time they need.</div>
<div class="dd-item">I&#x27;ve seen you stay patient even when things get frustrating, and that&#x27;s something I really admire.</div>
<div class="dd-item">You rarely get frustrated; your patience not only helps you, but calms everyone around you.</div>
<div class="dd-item">You&#x27;ve been through so much, and you come out stronger every time - it&#x27;s really inspiring.</div>
<div class="dd-item">You have a quiet strength about you that I truly admire. You handle challenges with such grace.</div>
<div class="dd-item">Your perseverance is something we all aspire to emulate.</div>
</div>
<div class="dd-category" id="dd-adaptability-problem-solving"><div class="dd-category-title">Adaptability &amp; Problem-Solving</div>
<div class="dd-item">Whenever there&#x27;s a problem, you&#x27;re the first person I think of-you always find a solution.</div>
<div class="dd-item">It&#x27;s amazing how you can break down any issue and figure it out.</div>
<div class="dd-item">You&#x27;re always the first one to step up and help.</div>
<div class="dd-item">I am amazed at how adaptable you are-no matter what situation you&#x27;re thrown into, you adjust so well.</div>
</div>
<div class="dd-category" id="dd-miscellaneous"><div class="dd-category-title">Miscellaneous</div>
<div class="dd-item">You&#x27;re a mountain of a man.</div>
<div class="dd-item">You seem happy today!</div>
<div class="dd-item">You&#x27;re so easily lovable.</div>
<div class="dd-item">I admire how you can engage deeply when it matters and also keep things light and easy. It&#x27;s a rare blend.</div>
<div class="dd-item">Ask someone what they would like engraved on their tombstone. Then, when the moment is right, fill the blanks with the very words they gave you weeks earlier.</div>
<div class="dd-item">The advice you give should come with its own podcast.</div>
<div class="dd-item">You weren&#x27;t kidding when you said you were hitting the gym!</div>
<div class="dd-item">I admire how you don&#x27;t just dream-you actually accomplish what you set out to do. Your achievements speak for themselves.</div>
</div>
<div class="dd-category" id="dd-strategies-to-give-more-better-compliments"><div class="dd-category-title">Strategies to Give More &amp; Better Compliments</div>
<div class="dd-item-label">Make It Obvious</div>
<div class="dd-item">Set daily reminders using visual cues like your phone or sticky notes to give at least one genuine compliment a day.</div>
<div class="dd-item">Tie compliments to daily activities, such as during breakfast or right before bed.</div>
<div class="dd-item-label">Make It Attractive</div>
<div class="dd-item">Pair giving compliments with something you enjoy, like having your morning coffee, to create a positive association.</div>
<div class="dd-item">Team up with your spouse or a friend who also wants to get better at giving compliments. Encourage each other and share ideas.</div>
<div class="dd-item-label">Make It Easy</div>
<div class="dd-item">Start small with simple, easy-to-express compliments and gradually work your way up to more detailed ones.</div>
<div class="dd-item">Keep a compliment journal documenting things you admire about others daily for a go-to source of inspiration.</div>
<div class="dd-item-label">Make It Satisfying</div>
<div class="dd-item">Use a habit tracker to mark days you&#x27;ve given a compliment to motivate continued effort.</div>
<div class="dd-item">Celebrate small wins: reward yourself for consistent effort, like a small treat after a week of daily compliments.</div>
<div class="dd-item-label">Keep Compliments Fresh</div>
<div class="dd-item">Diversify your compliments among character, efforts, achievements, physical appearance, and emotional intelligence.</div>
<div class="dd-item">Be a good listener: stay attentive to new hobbies, interests, or achievements for fresh compliment ideas.</div>
<div class="dd-item">Reflect on changes: acknowledge any positive changes or efforts, no matter how small.</div>
<div class="dd-item">Use literature and art for inspiration: draw from quotes, lines from poems, or movie themes.</div>
<div class="dd-item">Focus on the overlooked: compliment resilience, humor, or effort rather than the obvious.</div>
<div class="dd-item-label">Cultivate Awareness</div>
<div class="dd-item">Spend a few minutes daily on quiet reflection to improve awareness and appreciation of the present moment.</div>
<div class="dd-item">Practice active listening to better understand others&#x27; interests, achievements, and efforts.</div>
<div class="dd-item">Notice changes in appearance, behavior, or environment to find new reasons to give compliments.</div>
<div class="dd-item">Observe displays of kindness, patience, courage, and other virtues in people around you.</div>
<div class="dd-item">Recognize emotional labor-acknowledge the emotional support someone provides.</div>
<div class="dd-item">Maintain an observational journal to note interesting qualities or actions in people around you.</div>
</div>`);

// ─── Write the love-your-neighbors deep dive page ───────────────────────────
const LN_PAGE = `---
import { readFileSync } from 'node:fs';
import { join }         from 'node:path';
import BaseLayout       from '../layouts/BaseLayout.astro';

// The texts section is a 205K library — read from data file at build time
const textsRaw  = readFileSync(join(process.cwd(), 'src/data/texts-content.txt'), 'utf-8');
const textsHtml = textsRaw
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\\n/g, '<br>');
---

<BaseLayout
  title="Love Your Neighbors — Go Deeper"
  description="Deep dive reference library: 90+ acts of service, de-escalation phrases, Five Fives, gatherings calendar, compliment library, 200+ questions, loud listening techniques, texts, and gift ideas."
  canonicalPath="/love-your-neighbors-deep-dive/"
>
  <a class="overlay-back" href="/love-your-neighbors-takeaways/">&#8592; Back to Takeaways</a>
  <a class="overlay-close" href="/" aria-label="Close">&times;</a>

  <div class="takeaways-content">
    <span class="takeaways-tag">Love Your Neighbors</span>
    <h1 class="takeaways-title">Go Deeper — Reference Library</h1>
    <p class="takeaways-author" style="margin-bottom:1.5rem">Full actionable content from the Love Your Neighbors shelf</p>

    <div class="dd-topic-list" style="margin-bottom:2.5rem">
      <a class="dd-topic-link" href="#dd-acts">Acts of Service</a>
      <a class="dd-topic-link" href="#dd-difficult">Dealing with Difficult People</a>
      <a class="dd-topic-link" href="#dd-fivefives">The Five Fives</a>
      <a class="dd-topic-link" href="#dd-gatherings">Cul-de-Sac Gatherings</a>
      <a class="dd-topic-link" href="#dd-compliments">Compliment Library</a>
      <a class="dd-topic-link" href="#dd-texts">Showing Up with Words</a>
      <a class="dd-topic-link" href="#dd-questions">Asking Good Questions</a>
      <a class="dd-topic-link" href="#dd-loudlistening">Loud Listening</a>
      <a class="dd-topic-link" href="#dd-gifts">The Art of Giving Gifts</a>
    </div>

    <!-- ── Acts of Service ─────────────────────────────── -->
    <div class="dd-section" id="dd-acts">
      <Fragment set:html={${JSON.stringify(HTML.acts)}} />
    </div>
    <div class="dd-section-divider"></div>

    <!-- ── Difficult People ───────────────────────────── -->
    <div class="dd-section" id="dd-difficult">
      <Fragment set:html={${JSON.stringify(HTML.difficult)}} />
    </div>
    <div class="dd-section-divider"></div>

    <!-- ── Five Fives ─────────────────────────────────── -->
    <div class="dd-section" id="dd-fivefives">
      <Fragment set:html={${JSON.stringify(HTML.fivefives)}} />
    </div>
    <div class="dd-section-divider"></div>

    <!-- ── Gatherings ─────────────────────────────────── -->
    <div class="dd-section" id="dd-gatherings">
      <Fragment set:html={${JSON.stringify(HTML.gatherings)}} />
    </div>
    <div class="dd-section-divider"></div>

    <!-- ── Compliments ────────────────────────────────── -->
    <div class="dd-section" id="dd-compliments">
      <Fragment set:html={${JSON.stringify(HTML_COMPLIMENTS)}} />
    </div>
    <div class="dd-section-divider"></div>

    <!-- ── Showing Up with Words (texts) ─────────────── -->
    <div class="dd-section" id="dd-texts">
      <span class="takeaways-tag">Love Your Neighbors</span>
      <h1 class="takeaways-title">The Art of Showing Up with Words</h1>
      <p style="font-size:.9rem;color:#7A7368;font-style:italic;margin-bottom:2.5rem;font-family:'EB Garamond',serif">Real messages for every major life event — blueprints for your own voice</p>
      <div class="dd-category" id="dd-unabridged-source-library">
        <div class="dd-category-title">Unabridged Source Library</div>
        <div class="dd-item dd-item-raw" set:html={textsHtml}></div>
      </div>
    </div>
    <div class="dd-section-divider"></div>

    <!-- ── Questions ─────────────────────────────────── -->
    <div class="dd-section" id="dd-questions">
      <Fragment set:html={${JSON.stringify(HTML.questions || '')}} />
    </div>
    <div class="dd-section-divider"></div>

    <!-- ── Loud Listening ────────────────────────────── -->
    <div class="dd-section" id="dd-loudlistening">
      <Fragment set:html={${JSON.stringify(HTML.loudlistening)}} />
    </div>
    <div class="dd-section-divider"></div>

    <!-- ── Gifts ─────────────────────────────────────── -->
    <div class="dd-section" id="dd-gifts">
      <Fragment set:html={${JSON.stringify(HTML.gifts)}} />
    </div>
  </div>
</BaseLayout>

<style>
  .dd-section {
    padding: 2rem 0 1.5rem;
  }
  .dd-section-divider {
    border: none;
    border-top: 1px solid rgba(183, 156, 92, 0.2);
    margin: 0.5rem 0 2.5rem;
  }
  .dd-item-raw {
    font-family: 'EB Garamond', serif;
    font-size: 0.92rem;
    line-height: 1.9;
    color: #5e554b;
    white-space: pre-wrap;
    padding: 0.6rem 0 0.6rem 1.2rem;
    border-left: 2px solid rgba(183, 156, 92, 0.12);
  }
</style>
`;

// Read questions HTML from the extracted file (too large to inline in script)
const EXTRACTED = path.join(PROJECT, 'extracted_functions.txt');
let questionsHtml = '';
if (fs.existsSync(EXTRACTED)) {
  const raw = fs.readFileSync(EXTRACTED, 'utf-8');
  const start = raw.indexOf('===== getQuestionsPage');
  const end   = raw.indexOf('===== getActsPage');
  if (start !== -1 && end !== -1) {
    // Extract between function delimiters; strip the function header/footer lines
    const block = raw.slice(start, end);
    // Strip first two lines (===== header) and the function wrapper lines
    const innerStart = block.indexOf('return `') + 'return `'.length;
    const innerEnd   = block.lastIndexOf('`;');
    if (innerStart > 0 && innerEnd > 0) {
      questionsHtml = fixOnclicks(block.slice(innerStart, innerEnd));
    }
  }
}

// Patch questions into the page
const LN_PAGE_FINAL = LN_PAGE.replace(
  JSON.stringify(HTML.questions || ''),
  JSON.stringify(questionsHtml)
);

fs.writeFileSync(
  path.join(PAGES_DIR, 'love-your-neighbors-deep-dive.astro'),
  LN_PAGE_FINAL,
  'utf-8'
);
console.log('✓ Wrote love-your-neighbors-deep-dive.astro');


// ─── Disciple deep dive ──────────────────────────────────────────────────────
const DISCIPLE_PAGE = `---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Disciple — How to Help Someone Change"
  description="Deep dive: the Love / Know / Speak / Do framework for coming alongside someone and helping them change."
  canonicalPath="/disciple-deep-dive/"
>
  <a class="overlay-back" href="/disciple-takeaways/">&#8592; Back to Takeaways</a>
  <a class="overlay-close" href="/" aria-label="Close">&times;</a>

  <div class="takeaways-content">
    <Fragment set:html={${JSON.stringify(HTML.disciplechange)}} />
  </div>
</BaseLayout>
`;

fs.writeFileSync(
  path.join(PAGES_DIR, 'disciple-deep-dive.astro'),
  DISCIPLE_PAGE,
  'utf-8'
);
console.log('✓ Wrote disciple-deep-dive.astro');


// ─── Feed Your Body deep dive ────────────────────────────────────────────────
const FYB_DD_HTML = `<span class="takeaways-tag">Feed Your Body</span>
<h1 class="takeaways-title">Weekly Dinner Plan</h1>

<div class="dd-topic-list">
  <a class="dd-topic-link" href="#fyb-weekly-plan-table">Dinner Plan</a>
  <a class="dd-topic-link" href="#fyb-lunch-options">Lunch Options</a>
</div>

<div class="tk-section" id="fyb-weekly-plan-table">
  <div class="tk-section-title">Weekly Dinner Plan</div>
  <div class="fyb-table-wrap">
    <table class="fyb-table">
      <thead>
        <tr>
          <th>Day</th>
          <th>Dinner</th>
          <th>Ingredients</th>
          <th>Steps</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="fyb-day">Monday</td>
          <td>Chicken + Broccoli + Sweet Potato</td>
          <td><ul><li>Chicken thighs, broccoli, sweet potato fries</li><li>Mexican cheese, breadcrumbs, garlic</li><li>Cumin, onion powder, smoked paprika, lemon pepper</li><li>EVOO, salt, pepper</li></ul></td>
          <td><ul><li>Prep: Grill + oven 425F. Season chicken. Toss broccoli with EVOO + seasonings.</li><li>Grill chicken ~18 min (flip once) to 165F.</li><li>Roast broccoli 22 min at 425F; add cheese + crumbs, 2 min more. (Alt: air-fry 390F, 6 min.)</li><li>Air-fry fries 400F, 10-12 min, shake halfway.</li></ul></td>
        </tr>
        <tr>
          <td class="fyb-day">Tuesday</td>
          <td>Chicken Tortilla Soup</td>
          <td><ul><li>Chicken, broth, fire-roasted tomatoes</li><li>Beans, corn, green chilies, onion, garlic</li><li>Avocado, tortilla strips, cilantro, cheese</li><li>Jalapenos, sour cream, lime, cumin, chili, paprika</li></ul></td>
          <td><ul><li>Saute onion + garlic; add cumin/chili/paprika.</li><li>Add tomatoes + broth; simmer 10 min. Add chicken + beans + corn + chilies; 10-15 min.</li><li>Serve with tortilla, avocado, cheese, jalapeno, cilantro, sour cream, lime.</li></ul></td>
        </tr>
        <tr>
          <td class="fyb-day">Wednesday</td>
          <td>Salmon + Asparagus + Zucchini</td>
          <td><ul><li>Salmon, asparagus, zucchini</li><li>Garlic, butter, lemon, EVOO</li><li>Tony&#x27;s Cajun, red pepper flakes, salt/pepper</li></ul></td>
          <td><ul><li>Salmon: Pan sear (skin-down) 4-5 min, then flip 1-3 min more. (Alt: bake at 375F for 16 min if thawed or 29 min if frozen; target 135F.)</li><li>Asparagus: roast 425F, 12 min; lemon + optional parmesan for 1 min.</li><li>Zucchini: hot cast iron; sear 3-5 min/side; finish with butter + lemon.</li></ul></td>
        </tr>
        <tr>
          <td class="fyb-day">Thursday</td>
          <td>Spaghetti + Green Beans</td>
          <td><ul><li>Whole wheat thin spaghetti, 93/7 lean ground beef</li><li>Marinara sauce, garlic, onion (optional), EVOO</li><li>Green beans, butter, salt/pepper, garlic powder (optional)</li></ul></td>
          <td><ul><li>Pasta: boil salted water, cook 7-9 min, drain.</li><li>Saute onion 3-4 min, add garlic 30 sec. Brown beef 6-8 min; add marinara, simmer 5-10 min.</li><li>Green beans (Instant Pot): steam 3 min high pressure, quick release. Toss with butter + salt/pepper.</li></ul></td>
        </tr>
        <tr>
          <td class="fyb-day">Friday</td>
          <td>Tilapia + Peas + Carrots</td>
          <td><ul><li>Tilapia, peas, carrots</li><li>Honey, thyme, garlic, lemon</li><li>Butter, olive oil, salt/pepper</li></ul></td>
          <td><ul><li>Fish: thaw, dry, season; air-fry 360F for 12 min to 145F. Rest 2 min.</li><li>Carrots: bake 425F ~18 min; finish with honey + butter; add peas for last 4 min. (Alt: Instant Pot 1 min.)</li></ul></td>
        </tr>
        <tr>
          <td class="fyb-day">Saturday</td>
          <td>Shrimp + Okra Gumbo</td>
          <td><ul><li>Shrimp, smoked sausage (optional), okra, bell pepper, onion, celery, garlic, brown rice</li><li>Diced tomatoes, chicken broth, Worcestershire, bay leaf</li><li>EVOO, smoked paprika, thyme, oregano, cayenne, salt/pepper</li></ul></td>
          <td><ul><li>Brown rice (Instant Pot): 1 cup rice + 1&frac14; cups water + salt. High pressure 22 min, release then fluff.</li><li>Saute onion + pepper + celery 5-7 min; add garlic + spices 1 min.</li><li>Add okra + tomatoes 5 min; add broth + Worcestershire; simmer 15-20 min. Add shrimp 3-4 min until pink.</li></ul></td>
        </tr>
        <tr>
          <td class="fyb-day">Sunday</td>
          <td>Carne Asada Street Tacos</td>
          <td><ul><li>NY strip (or flat iron) steak (~1 lb), small corn tortillas, charro beans</li><li>Lime, orange, soy sauce, EVOO, garlic, cilantro, cumin, chili powder, paprika, salt/pepper</li><li>Onion, jalapeno, salsa verde, queso fresco</li></ul></td>
          <td><ul><li>Marinate: lime + orange juice, soy sauce, oil, garlic, cilantro + dry spices. 30 min to 2 hrs.</li><li>Sous vide at 128F for 2 hours, then grill steak 3 min each side to 135F; rest 5 min, then chop.</li><li>Warm tortillas; top with steak, onion, jalapeno, cilantro, salsa, cheese. Serve with beans.</li></ul></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="tk-section" id="fyb-lunch-options">
  <div class="tk-section-title">Lunch Options</div>
  <div class="fyb-lunch-grid">
    <div class="fyb-card">
      <div class="fyb-card-title">Go-To Picks</div>
      <ul>
        <li>Fruit (apple/berries/citrus/kiwi)</li>
        <li>Veg + hummus</li>
        <li>Kimchi, kefir</li>
        <li>Prepared salads (orzo/kale)</li>
        <li>Nuggets/wings/dumplings</li>
        <li>Avocado turkey sandwich</li>
      </ul>
    </div>
    <div class="fyb-card">
      <div class="fyb-card-title">Grab &amp; Go</div>
      <ul>
        <li>Turkey slices, summer sausage, turkey sticks</li>
        <li>Tuna + crackers</li>
        <li>Pumpkin seeds, pistachios, trail mix</li>
        <li>IQBar, Alyssa&#x27;s bites</li>
        <li>Poshi olives</li>
      </ul>
    </div>
    <div class="fyb-card">
      <div class="fyb-card-title">Pre-Dinner Protein</div>
      <ul>
        <li>Momentous 20g protein in water</li>
      </ul>
    </div>
  </div>
</div>`;

const FYB_PAGE = `---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Feed Your Body — Weekly Dinner Plan"
  description="Deep dive: a full weekly dinner rotation with ingredients and step-by-step cooking instructions, plus lunch options."
  canonicalPath="/feed-your-body-deep-dive/"
>
  <a class="overlay-back" href="/feed-your-body-takeaways/">&#8592; Back to Takeaways</a>
  <a class="overlay-close" href="/" aria-label="Close">&times;</a>

  <div class="takeaways-content">
    <Fragment set:html={${JSON.stringify(FYB_DD_HTML)}} />
  </div>
</BaseLayout>
`;

fs.writeFileSync(
  path.join(PAGES_DIR, 'feed-your-body-deep-dive.astro'),
  FYB_PAGE,
  'utf-8'
);
console.log('✓ Wrote feed-your-body-deep-dive.astro');

console.log('\nDone! Run: npm run build  to verify.');
