json.extract! ticket, :id, :user_id, :subject, :description, :state
json.created_at(ticket.created_at.strftime('%d.%m.%Y %H:%M:%S'))
