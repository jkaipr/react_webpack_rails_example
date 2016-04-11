json.array!(@comments) do |comment|
  json.extract! comment, :text
  json.userEmail comment.user.email
  json.createdAt comment.created_at.strftime('%d.%m.%Y %H:%M:%S')
end
