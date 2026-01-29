/**
 * Parse CSV data into participant objects
 * @param {string} text - CSV file content as string
 * @returns {{ participants: Array<{id: string, name: string}> | null, error: string | null }}
 */
export function parseCSVData(text) {
  // Split lines, handle Windows/Mac/Unix line endings
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    return { participants: null, error: 'File must have a header and at least one participant row.' };
  }
  
  // Validate header (first line)
  const header = lines[0].split(';');
  if (!header.includes('ID') || !header.includes('Name')) {
    return { participants: null, error: 'Header must include at least "ID" and "Name" columns.' };
  }
  
  // Parse participants (skip header)
  const idxID = header.indexOf('ID');
  const idxName = header.indexOf('Name');
  const idxFullName = header.indexOf('Full name');
  const participants = lines.slice(1)
    .map(line => line.split(';'))
    .filter(cols => cols.length >= header.length && cols[idxID])
    .map(cols => {
      const id = cols[idxID]?.trim();
      let name = cols[idxName]?.trim();
      if ((!name || name === '') && idxFullName !== -1) {
        name = cols[idxFullName]?.trim();
      }
      return { id, name };
    })
    .filter(p => p.id && p.name);
  
  if (participants.length < 2) {
    return { participants: null, error: 'File must contain at least 2 valid participants.' };
  }
  
  return { participants, error: null };
}

/**
 * Parse XLSX data (row arrays) into participant objects
 * @param {Array<Array<any>>} rows - 2D array of worksheet rows
 * @returns {{ participants: Array<{id: string, name: string}> | null, error: string | null }}
 */
export function parseXLSXData(rows) {
  if (!rows || rows.length < 2) {
    return { participants: null, error: 'File must have a header and at least one participant row.' };
  }
  
  // Get header row
  const header = rows[0].map(h => String(h || '').toLowerCase().trim());
  
  // Find column indices (case-insensitive)
  const idxID = header.findIndex(col => col === 'id' || col.includes('id'));
  const idxName = header.findIndex(col => col === 'name' && !col.includes('full'));
  const idxFullName = header.findIndex(col => col.includes('full name') || col === 'fullname');
  
  if (idxID === -1 || (idxName === -1 && idxFullName === -1)) {
    return { 
      participants: null, 
      error: 'Header must include at least "ID" and "Name" columns. Found columns: ' + rows[0].join(', ') 
    };
  }
  
  // Parse participants (skip header)
  const participants = rows.slice(1)
    .filter(row => Array.isArray(row) && row.length > 0 && row[idxID]) // Has ID value
    .map(row => {
      const id = String(row[idxID] || '').trim();
      let name = '';
      
      // Try to get name from Name column first, then Full name
      if (idxName !== -1 && row[idxName]) {
        name = String(row[idxName]).trim();
      }
      
      if (!name && idxFullName !== -1 && row[idxFullName]) {
        name = String(row[idxFullName]).trim();
      }
      
      return { id, name };
    })
    .filter(p => p.id && p.name); // Only include entries with both ID and name
  
  if (participants.length < 2) {
    return { participants: null, error: 'File must contain at least 2 valid participants with both ID and Name values.' };
  }
  
  return { participants, error: null };
}
