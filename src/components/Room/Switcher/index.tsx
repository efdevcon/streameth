import { Room } from 'types'

interface RoomSwitcherProps {
  rooms: Room[]
  activeRoom: Room
  onRoomClick: (roomId: string) => void
}

export default function RoomSwitcher({ rooms, activeRoom, onRoomClick }: RoomSwitcherProps) {
  if (rooms.length === 1) {
    return null
  }
  return (
    <div className="room__switcher">
      <div className="room__switcher__title">Select room</div>
      <div className="room__switcher__scroll">
        <ul className="room__switcher__rooms">
          {rooms.map(room => {
            return (
              <li
                onClick={() => onRoomClick(room.id)}
                key={`room_switcher_${room.id}`}
                className={`room__switcher__room ${room.id === activeRoom.id ? 'active' : ''}`}
              >
                {room.id}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
