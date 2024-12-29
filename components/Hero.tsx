import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center space-x-2 text-blue-500 border border-blue-500 rounded-full py-2 px-4">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
        <div>Secure Reporting</div>
      </div>

      <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
        Report Incident.
        <span className="block bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
          Protect Identity.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
        Enhance the safety of your community while prioritizing your security.
        Our advanced encryption technology safeguards your identity, allowing
        you to contribute confidently to a safer and more secure environment for
        everyone.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link href={"/submit-report"}>
          <Button className="group relative flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-sm font-medium text-white transition-all hover:bg-red-600">
            Make Report
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </Button>
        </Link>
        <Link href="/about">
          <Button className="group relative flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 text-sm font-medium text-white transition-all hover:bg-green-600">
            How it works ?
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="mt-40 grid gap-6 sm:grid-cols-3">
        {[
          {
            title: "Advanced Data Encryption",
            description:
              "Protecting your identity with cutting-edge encryption protocols",
            icon: (
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#0049a8"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M4.35009 13.3929L8 16L11.6499 13.3929C13.7523 11.8912 15 9.46667 15 6.88306V3L8 0L1 3V6.88306C1 9.46667 2.24773 11.8912 4.35009 13.3929Z"
                    fill="#0091ff"
                  />{" "}
                </g>
              </svg>
            ),
          },
          {
            title: "Instant Response System",
            description:
              "Efficient verification and secure management of reports",
            icon: (
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 1024 1024"
                className="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M704 469.333333h-200.533333L640 106.666667H405.333333l-128 448h183.466667L362.666667 960z"
                  fill="#FFC107"
                />
              </svg>
            ),
          },
          {
            title: "Confidential Communication",
            description:
              "A secure and private channel for sensitive interactions",
            icon: (
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M8 10.5H16"
                    stroke="#00c70d"
                    strokeWidth="1.6799999999999997"
                    strokeLinecap="round"
                  />{" "}
                  <path
                    d="M8 14H13.5"
                    stroke="#00c70d"
                    strokeWidth="1.6799999999999997"
                    strokeLinecap="round"
                  />{" "}
                  <path
                    d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
                    stroke="#00c70d"
                    strokeWidth="1.6799999999999997"
                    strokeLinecap="round"
                  />{" "}
                </g>
              </svg>
            ),
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl bg-zinc-900 p-8 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 to-gray-900 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-5 inline-flex rounded-xl bg-blue-500/10 p-3">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-lg font-medium text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-40 rounded-2xl bg-zinc-900 p-8">
        <div className="grid gap-y-8 sm:grid-cols-3">
          {[
            { value: "100K+", label: "Reports Filed" },
            { value: "100%", label: "Anonymity Rate" },
            { value: "24/7", label: "Support Available" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-zinc-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
