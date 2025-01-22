interface IStatusContProps {
  status: string;
  setStatus: (status: string) => void;
}

const StatusCont = ({ status, setStatus }: IStatusContProps) => {
  return (
    <section className="w-full h-10 bg-red200 mb-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <p className="text-sm text-gray-600 mr-2">Status:</p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default StatusCont;
