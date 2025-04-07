export default function AdminDashboard() {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Posts"
          value="24"
          description="3 new in the last week"
          icon={<DocumentIcon />}
        />
        <DashboardCard
          title="Comments"
          value="142"
          description="18 pending approval"
          icon={<ChatIcon />}
        />
        <DashboardCard
          title="Users"
          value="843"
          description="12 new registrations"
          icon={<UserIcon />}
        />
      </div>

      <div className="mt-8 rounded-lg bg-slate-100 p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is a placeholder for recent activity. You can add your admin functionality here.
        </p>
      </div>
    </>
  )
}

// Dashboard card component
function DashboardCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-lg bg-slate-100 p-6 shadow-md dark:bg-gray-800">
      <div className="flex items-center">
        <div className="bg-primary-100 dark:bg-primary-900 mr-4 rounded-full p-3">{icon}</div>
        <div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">{title}</h3>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
}

// Icons
function DocumentIcon() {
  return (
    <svg
      className="text-primary-600 dark:text-primary-400 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg
      className="text-primary-600 dark:text-primary-400 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
      />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      className="text-primary-600 dark:text-primary-400 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  )
}
