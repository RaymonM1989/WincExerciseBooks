import recordData from '../../data/records.json' assert { type: "json" };

const updateRecordById = (title, artist, year, available, genre) =>
{
    const record = recordData.records.find(record => record.id === id);

    if (!record)
    {
        throw new Error (`Record with ID ${id} was not found!`);
    }

    record.title      = title     ??  record.title;
    record.artist     = artist    ??  record.artist;
    record.year       = year      ??  record.year;
    record.available  = available ??  record.available;
    record.genre      = genre     ??  record.genre;

    return record;
}

export default updateRecordById;