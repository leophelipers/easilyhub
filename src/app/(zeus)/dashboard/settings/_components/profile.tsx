'use client'
// export interface IProfileProps {} props: IAdminTopbarProps

export default function Profile() {
  return (
    <div className="w-full h-max p-6 rounded shadow">
      <div>
        <h1 className="text-zinc-800 text-2xl font-bold">Perfil</h1>
        <div className="flex flex-row">
          <div className="bg-emerald-700 h-screen p-2 flex flex-col"></div>
          <div className="bg-green-950 h-screen p-2 flex-1"></div>
        </div>
      </div>
    </div>
  )
}
