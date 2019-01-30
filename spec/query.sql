/c nc_news;

SELECT * FROM articles;
-- SELECT parties.party, parties.founded, COUNT (mps.mp_id) AS mp_count FROM parties
-- LEFT JOIN mps
-- ON parties.party = mps.party
-- GROUP BY parties.party
-- ORDER BY parties.founded DESC,
-- parties.party ASC
-- LIMIT 10;

select('parties.party, parties.founded')
.count('mps.mp_id as mp_count ')
.leftJoin('mps, parties.party', '=', 'mps.party')
.from('parties')
.limit('limit')
.groupBy('parties.party')
.orderBy()