module API
  module ErrorSerializer
    def serialize_errors(errors)
      json = { ok: false }
      return if errors.nil?
      errors = errors.to_hash(true) if errors.is_a? ActiveModel::Errors
      json[:errors] = format_errors(errors)
      json
    end

    private

    def format_errors(errors)
      errors.map do |k, v|
        v.map do |msg|
          {
              code: msg,
              source: { pointer: k },
              title: msg
          }
        end
      end.flatten
    end
  end
end