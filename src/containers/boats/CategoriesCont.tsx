import ShipTypeComp from "../../components/boats/ShipTypeComp";

const CategoriesCont = ({
  shipsTypes,
  selectedType,
  setSelectedType,
}: any) => {

  // not used

  return (
    <div className="relative flex items-center justify-center w-full h-16 pt-2 lg:h-24 lg:justify-center">
      <div className="components flex items-center h-full gap-6 lg:gap-10">
        {shipsTypes.map((shipType: any, index: number) => (
          <ShipTypeComp
            key={index}
            shipType={shipType}
            selected={selectedType}
            setSelected={setSelectedType}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesCont;
