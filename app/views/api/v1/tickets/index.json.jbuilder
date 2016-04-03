json.array!(@tickets) do |ticket|
  json.partial! 'api/v1/tickets/show', ticket: ticket
end
