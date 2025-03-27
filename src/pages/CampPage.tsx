// CampPage.tsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Local images (adjust paths if needed)
import bootcampRunning from '../assets/bootcamp-running.png';
import flyer from '../assets/flyer.png';

export default function CampPage() {
  return (
    <>
      <Header />

      {/* Hero / Banner Section */}
      <section
        className="
          relative
          text-white
          flex
          items-center
          justify-center
          h-[70vh]
        "
        style={{
          backgroundImage: `url(${bootcampRunning})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Youth Speed &amp; Agility Camp
          </h1>
          <p className="text-lg md:text-xl font-semibold mb-6">
            6-Week Program &middot; Two Days a Week
          </p>
          <a
            href="#details"
            className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-bold hover:bg-yellow-500 transition"
          >
            Register Your Child Now
          </a>
        </div>
      </section>

      <main className="pt-24 pb-16 bg-white">
        {/* Introduction / Overview */}
        <section className="max-w-5xl mx-auto px-4 mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Where Fitness Meets Science</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <strong>The Lab</strong>, we blend the science of performance with the art of coaching to help your child unlock their true potential. Our holistic approach fosters confidence, unstoppable drive, and real-world results. Whether they’re aiming for explosive speed, improved agility, or game-changing endurance, this <em>6-week Speed &amp; Agility Program</em> is designed to elevate their athletic performance both on and off the field.
          </p>
        </section>

        {/* Camp Details */}
        <section
          id="details"
          className="max-w-5xl mx-auto px-4 py-10 bg-gray-50 rounded-lg shadow-md mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Camp Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column */}
            <div className="flex flex-col justify-center space-y-4 text-gray-700 text-lg">
              <ul className="space-y-4">
                <li>
                  <strong>Cost:</strong> $50/week or $250 for the full program
                </li>
                <li>
                  <strong>Location:</strong> Bulverde Park
                </li>
                <li>
                  <strong>Dates:</strong> June 3 - July 17
                </li>
                <li>
                  <strong>Days:</strong> Tues &amp; Thurs
                </li>
                <li>
                  <strong>Program Schedule:</strong>
                  <ul className="list-disc list-inside ml-6">
                    <li>First 3-weeks: June 3rd – June 19th, 2025</li>
                    <li>One Week Break: June 23rd – June 27th, 2025</li>
                    <li>Remaining 3-weeks: July 1st – July 17th, 2025</li>
                  </ul>
                </li>
                <li>
                  <strong>Age Groups &amp; Times:</strong>
                  <ul className="list-disc list-inside ml-6">
                    <li>6-10 yrs: 5-6 PM or 6-7 PM</li>
                    <li>11-15 yrs: 7-8 PM</li>
                  </ul>
                </li>
                <li>
                  <strong>Spots:</strong> Limited to 20 participants per session
                </li>
              </ul>
              {/* Registration Button directly under the details */}
              <div className="mt-4">
                <a
                  href="https://pay.thelab210.com/summer-camp"
                  className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-500 transition"
                >
                  Register Your Child Now
                </a>
              </div>
            </div>

            {/* Right Column: Flyer */}
            <div className="flex items-center justify-center">
              <img
                src={flyer}
                alt="Speed &amp; Agility Camp Flyer"
                className="w-full h-auto rounded-md shadow"
              />
            </div>
          </div>
        </section>

        {/* What Your Child Will Gain */}
        <section className="max-w-5xl mx-auto px-4 py-10 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">What Your Child Will Gain</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div className="space-y-4">
              <p>
                Our training philosophy focuses on building a foundation of strength, balance, and agility that translates directly to real-world performance for kids. By combining cutting-edge drills, functional strength exercises, and plyometric training, your child will experience:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Explosive Speed &amp; Agility</li>
                <li>Elite Balance &amp; Body Control</li>
                <li>Endurance &amp; Strength for Growing Bodies</li>
                <li>Sharpened Focus &amp; Technique</li>
                <li>Confidence Through Challenging Workouts</li>
              </ul>
            </div>
            <div className="space-y-4">
              <p>
                At <strong>The Lab</strong>, we believe in more than just workouts—it’s about creating an environment that fuels confidence in young athletes and fosters sustainable progress. Each session is carefully structured to challenge their limits, boost motivation, and ensure they leave feeling stronger, faster, and more empowered.
              </p>
              <p>
                This camp is ideal for kids of all skill levels—from those looking to excel in team sports to those aiming to enhance overall fitness, speed, and agility in daily life.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose The Lab for Your Child */}
        <section className="max-w-5xl mx-auto px-4 py-10 mb-16 bg-gray-100 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose The Lab for Your Child?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div className="space-y-4">
              <p>
                <strong>The Lab</strong> is where youth fitness meets science. Our approach blends evidence-based programming with expert coaching, ensuring every workout is optimized for real results. We tailor drills to your child’s individual needs, helping them develop a rock-solid foundation of speed, agility, and athleticism.
              </p>
              <p>
                From personalized feedback to small-group camaraderie, we cultivate an atmosphere that motivates and challenges each participant. With a focus on technique and progression, you’ll see measurable improvements in your child’s performance—and they’ll have a blast doing it.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Ready to help your young athlete push past plateaus? Our 6-week camp is not just about quick gains; it’s about laying the groundwork for long-term athletic success. Whether your child wants to stand out in sports or simply gain more confidence, <em>we’ve got them covered.</em>
              </p>
              <p>
                Join us and discover how science, passion, and a supportive community can unlock your child’s full potential. Are you prepared to take the first step toward helping them become the best version of themselves?
              </p>
            </div>
          </div>
        </section>

        {/* Registration / CTA */}
        <section className="max-w-4xl mx-auto px-4 py-10 text-center">
          <h2 className="text-3xl font-bold mb-4">How to Register</h2>
          <p className="text-lg text-gray-700 mb-6">
            Secure your child’s spot today by calling us at{" "}
            <a href="tel:2102841082" className="text-blue-600 hover:underline">
              (210) 284-1082
            </a>{" "}
            or clicking the button below to register online. Don’t wait—spaces are limited!
          </p>
          <a
            href="https://pay.thelab210.com/summer-camp"
            className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-bold hover:bg-yellow-500 transition"
          >
            Register Your Child Now
          </a>
        </section>
      </main>

      <Footer />
    </>
  );
}
